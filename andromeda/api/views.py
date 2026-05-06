import random

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from .serializers import (
    ProductSerializer, SendCodeSerializer, VerifyCodeSerializer
)
from products.models import Product


User = get_user_model()


@extend_schema(tags=['👥 Аутентификация'], summary='Получить OTP-код')
class SendCodeView(views.APIView):
    """
    Отправка одноразового кода подтверждения (OTP).

    Генерит 6-значный код в формате XXX-XXX, сохраняет в Redis с TTL 5 минут.
    Используется для двухфакторной аутентификации пользователей магазина.

    **Пример запроса:**
        POST /api/v1/auth/send-code/
        {
            "phone": "89123456789"
        }

    **Успешный ответ:**
        200 OK
        {
            "phone": "+79123456789",
            "code": "123-456"
        }

    **Ошибки:**
        400 Bad Request - неверный формат или номер телефона.
    """

    serializer_class = SendCodeSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone']

        code_num = random.randint(100000, 999999)
        code = f'{code_num // 1000}-{code_num % 1000:03d}'
        cache.set(f'{phone}', code, 300)
        return Response(
            {'phone': phone, 'code': code},
            status=status.HTTP_200_OK
        )


class CookieAuthMixin:
    """Миксин добавления/удаления токенов в cookie."""

    def set_auth_cookies(self, response, access_token, refresh_token):
        access_lifetime = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']
        refresh_lifetime = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']

        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
            value=access_token,
            max_age=int(access_lifetime.total_seconds()),
            httponly=True,
            secure=False,   # На проде по https строго True
            samesite='Lax',
            path=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS_PATH'],
        )
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=refresh_token,
            max_age=int(refresh_lifetime.total_seconds()),
            httponly=True,
            secure=False,   # На проде по https строго True
            samesite='Lax',
            path=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH_PATH'],
        )
        return response

    def clear_auth_cookies(self, response):
        response.delete_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
            path=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS_PATH'],
        )
        response.delete_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            path=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH_PATH'],
        )
        return response


@extend_schema(tags=['👥 Аутентификация'], summary='Получить JWT-токен по коду')
class VerifyCodeView(CookieAuthMixin, views.APIView):
    """
    Верификация одноразового кода подтверждения (OTP) и выдача JWT.

    Проверяет код в Redis (TTL 5 мин), создаёт/возвращает User по телефону.
    Для новых пользователей: отключает парольную авторизацию.
    Возвращает access/refresh токены для Bearer-аутентификации.

    **Пример запроса:**
        POST /api/v1/auth/verify-code/
        {
            "phone": "+79123456789",
            "code": "123-456"
        }

    **Успешный ответ:**
        200 OK:
        {
            'detail': 'Вход выполнен.,
        }

    **Ошибки:**
        - 400 Bad Request: неверный код/формат телефона
        - 500 Internal Server Error: JWT ошибка

    Токены access и refresh пишутся в cookie.
    Redis-код удаляется после получения JWT-токена.
    """

    serializer_class = VerifyCodeSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone']

        user, created = User.objects.get_or_create(
            phone=phone, defaults={'username': phone}
        )
        if created:
            user.set_unusable_password()
            user.save(update_fields=['password'])

        try:
            refresh = RefreshToken.for_user(user)
        except TokenError:
            return Response(
                {'error': 'Ошибка выдачи токена.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        response = Response({'detail': 'Вход выполнен.'},
                            status=status.HTTP_200_OK)
        response.auth_tokens = {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }
        return response

    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response,
                                             *args, **kwargs)

        tokens = getattr(response, 'auth_tokens', None)
        if not tokens:
            return response

        return self.set_auth_cookies(
            response,
            access_token=tokens['access'],
            refresh_token=tokens['refresh'],
        )


@extend_schema(tags=['👥 Аутентификация'], summary='Выход - logout')
@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(CookieAuthMixin, views.APIView):
    """Завершает пользовательскую сессию.

    Требует действующий access-токен в cookie.
    Возвращает сообщение о разлогине.

    Raises:
        PermissionDenied: Если токен недействителен, истёк или пользователь
        неактивен.
        AuthenticationFailed: Если отсутствует или неверный token.

    Returns:
        Статус: 200 OK.
        'detail': 'Выход выполнен.'
    """

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = None

    def post(self, request):
        refresh_token = request.COOKIES.get(
            settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']
        )
        if refresh_token:
            try:
                RefreshToken(refresh_token)
            except TokenError:
                return Response(
                    {'detail': 'Невалидный refresh token.'},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        response = Response({'detail': 'Выход выполнен.'},
                            status=status.HTTP_200_OK)
        return self.clear_auth_cookies(response)


@extend_schema(tags=['👥 Аутентификация'], summary='Обновить JWT-токен')
class TokenRefreshView(CookieAuthMixin, TokenRefreshView):
    """Обновление JWT-токена по refresh."""

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(
            settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH']
        )
        if not refresh_token:
            return Response(
                {'detail': 'Refresh token отсутствует.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = self.get_serializer(data={'refresh': refresh_token})
        try:
            serializer.is_valid(raise_exception=True)
        except InvalidToken:
            return Response(
                {'detail': 'Невалидный refresh token.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        access_token = serializer.validated_data['access']
        new_refresh_token = serializer.validated_data.get(
            'refresh', refresh_token
        )

        response = Response({'detail': 'Токен обновлён.'},
                            status=status.HTTP_200_OK)
        response.auth_tokens = {
            'access': access_token,
            'refresh': new_refresh_token,
        }
        return response

    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response,
                                             *args, **kwargs)

        tokens = getattr(response, 'auth_tokens', None)
        if not tokens:
            return response

        return self.set_auth_cookies(
            response,
            access_token=tokens['access'],
            refresh_token=tokens['refresh'],
        )


@extend_schema(tags=['📦 Товары'])
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet для просмотра товаров (только чтение).

    Предоставляет API-эндпоинты для получения списка опубликованных товаров
    и детальной информации по артикулу.

    Эндпоинты:
        GET /api/v1/products/?limit=20&offset=0 — список товаров
        GET /api/v1/products/123-456/ — товар по артикулу

    Примечания:
        - Пагинация через query-параметры limit/offset
        - Только опубликованные товары (card_objects)
    """

    queryset = Product.card_objects.get_card_products()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
    lookup_field = 'articul'
