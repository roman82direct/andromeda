import random

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from drf_spectacular.utils import extend_schema
from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework_simplejwt.exceptions import TokenError
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


@extend_schema(tags=['👥 Аутентификация'], summary='Получить JWT-токен по коду')
class VerifyCodeView(views.APIView):
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
            "phone": "+79123456789",
            "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
            "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
        }

    **Ошибки:**
        - 400 Bad Request: неверный код/формат телефона
        - 500 Internal Server Error: JWT ошибка

    Redis код удаляется после получения JWT-токена.
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

        cache.delete(f'{phone}')
        return Response({
            'phone': user.phone,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        })


@extend_schema(tags=['👥 Аутентификация'], summary='Выход - logout')
@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(views.APIView):
    """Завершает пользовательскую сессию.

    Требует действующий access-токен в заголовке Authorization: Bearer token.
    Возвращает информацию о текущем пользователе и сообщение о разлогине.

    Raises:
        PermissionDenied: Если токен недействителен, истёк или пользователь
        неактивен.
        AuthenticationFailed: Если отсутствует или неверный token.

    Returns:
        Response: JSON с номером телефона пользователя и сообщением
        "Вы вышли из системы."
        Статус: 205 Reset Content.
    """

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = None

    def post(self, request):
        return Response(
            {
                'user': request.user.phone,
                'message': 'Вы вышли из системы.'
            }, status=status.HTTP_200_OK)


@extend_schema(tags=['👥 Аутентификация'], summary='Обновить JWT-токен')
class TokenRefreshViewWrapper(TokenRefreshView):
    """Обновление JWT-токена по refresh."""


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
