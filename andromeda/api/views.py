import random

from django.core.cache import cache
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import status, views, viewsets
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    ProductSerializer, SendCodeSerializer
)
from products.models import Product


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

    def post(self, request):
        serializer = SendCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data.get('phone')

        code_num = random.randint(100000, 999999)
        code = f'{code_num // 1000}-{code_num % 1000:03d}'
        cache.set(f'{phone}', code, 300)
        return Response(
            {'phone': phone, 'code': code},
            status=status.HTTP_200_OK
        )


class VerifyCodeView(views.APIView):
    pass


class LogoutView(views.APIView):
    pass


@extend_schema_view(
    list=extend_schema(
        summary='Получить список товаров',
        description='Возвращает список опубликованных товаров с пагинацией.',
    ),
    retrieve=extend_schema(
        summary='Получить товар по артикулу',
        description='Возвращает информацию о товаре по его артикулу.',
    ),
)
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet модели Product."""

    queryset = Product.card_objects.get_card_products()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
    lookup_field = 'articul'
