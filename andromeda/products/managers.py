from django.db import models

from .querysets import ProductQuerySet


class ProductManager(models.Manager):
    """Кастомный менеджер модели Product."""

    def get_queryset(self):
        return ProductQuerySet(self.model, using=self._db)

    def get_card_products(self):
        return self.get_queryset(

        ).with_related(

        ).published(

        ).annotated_comments(

        ).ordered_products(

        ).prefetch_related('images')
