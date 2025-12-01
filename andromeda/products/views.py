from django.contrib.auth import get_user_model

from django.views.generic import ListView

from .models import Product


User = get_user_model()


class CollectionsList(ListView):

    template_name = 'products/index.html'
    context_object_name = 'products'

    def get_queryset(self):
        return Product.card_objects.get_card_products()
