from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination

from .serializers import ProductSerializer
from products.models import Product


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet модели Product."""

    queryset = Product.card_objects.get_card_products()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
