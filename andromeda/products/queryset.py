from django.db import models
from django.db.models import Count, Q


class ProductQuerySet(models.QuerySet):
    def with_related(self):
        return self.select_related(
            'second_category',
            'brand',
            'collection'
        )

    def annotated_comments(self):
        return self.annotate(
            comment_count=Count('comments')
        )

    def ordered_products(self):
        return self.order_by('item_number')

    def published(self):
        return self.filter(
            (
                Q(is_published=True)
                & Q(second_category__is_published=True)
                & Q(brand__is_published=True)
            )
            & (
                Q(collection_id=None)
                | Q(collection__is_published=True)
            )
        )
