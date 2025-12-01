from django.contrib.auth import get_user_model

from django.views.generic import ListView

from .models import Product


User = get_user_model()


class CollectionsList(ListView):
    """
    Листинг основной страницы сайта, на данный момент выводит только products.
    """
    template_name = 'products/index.html'
    context_object_name = 'products'

    def get_queryset(self):
        return Product.published.all()

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
