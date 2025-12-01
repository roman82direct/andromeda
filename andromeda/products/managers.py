from django.db import models
from django.db.models import Count


class ProductQuerySet(models.QuerySet):
    def with_related(self):
        return self.select_related(
            'second_category',
            'brand',
            'collection'
        ).annotate(
            comment_count=Count('comments')
        ).order_by('item_number')
    
    def published(self):
        return self.with_related().filter(
            is_published=True,
            second_category__is_published=True,
            brand__is_published=True,
            collection__is_published=True
        )


class PublishedProductManager(models.Manager):
    """Менеджер только для опубликованных продуктов"""
    def get_queryset(self):
        return ProductQuerySet(self.model, using=self._db).published()


class ProductManager(models.Manager):
    """Основной менеджер с доступом ко всем методам"""
    def get_queryset(self):
        return ProductQuerySet(self.model, using=self._db)
    
    def published(self):
        return self.get_queryset().published()
    
    def with_related(self):
        return self.get_queryset().with_related()