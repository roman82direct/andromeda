from django.contrib.auth import get_user_model
from django.db.models import Count

from django.views.generic import ListView

from .models import Product, Brand, Collection, SecondCategory


User = get_user_model()


def get_filtered_product(manager):
    query = get_product_without_filter(manager).filter(
        is_published=True,
        second_category__is_published=True,
        brand__is_published=True,
        collection__is_published=True
    )
    return query


def get_product_without_filter(manager):
    query = manager.select_related(
        'second_category',
        'brand',
        'collection'
    ).order_by('item_number').annotate(comment_count=Count('comments'))
    return query


class CollectionsList(ListView):
    """
    Листинг основной страницы сайта, на данный момент выводит только products.
    """
    model = Product
    template_name = 'products/index.html'
    context_object_name = 'products'

    def get_queryset(self):
        products = get_filtered_product(Product.objects)
        return products

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     context['products'] = [
    #         {
    #             'name': 'Product_1',
    #             'category': 'Category_1',
    #             'collection': 'Collection_1',
    #             'price': 100,
    #             'url': 'products_img/plug_1.jpg'
    #         },
    #         {
    #             'name': 'Product_2',
    #             'category': 'Category_2',
    #             'collection': 'Collection_2',
    #             'price': 200,
    #             'url': 'products_img/plug_2.jpg'
    #         },
    #     ]
    #     context['collections'] = [
    #         {
    #             'name': 'Collection_1',
    #             'url': 'collections_img/plug_1.jpg'
    #         },
    #         {
    #             'name': 'Collection_2',
    #             'url': 'collections_img/plug_2.jpg'
    #         },
    #     ]
    #     return context
