from django.db import models

from .queryset import ProductQuerySet


class ProductManager(models.Manager):
    """Основной менеджер с доступом ко всем методам"""
    def get_queryset(self):
        return ProductQuerySet(self.model, using=self._db)

    def ordered_products(self):
        return self.get_queryset().ordered_products()

    def published(self):
        return self.get_queryset().published()

    def with_related(self):
        return self.get_queryset().with_related()

    def annotated_comments(self):
        return self.get_queryset().annotated_comments()
