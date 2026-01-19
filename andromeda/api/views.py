from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination

from .serializers import ProductSerializer
from products.models import Product


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
