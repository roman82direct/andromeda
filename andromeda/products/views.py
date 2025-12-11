from django.contrib.auth import get_user_model
from django.db.models import CharField, OuterRef, Subquery
from django.views.generic import ListView

from .models import Collection, Image, Product


User = get_user_model()


class MainList(ListView):
    template_name = 'products/index.html'
    context_object_name = 'products'

    def get_queryset(self):
        return Product.card_objects.get_card_products()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        main_img_subquery = (
            Image.objects
            .filter(product__collection=OuterRef('pk'), is_main=True)
            .order_by('-update_at')
            .values('img_url')[:1]
        )
        collections = (
            Collection.objects.filter(
                is_published=True
            ).annotate(
                img_url=Subquery(main_img_subquery, output_field=CharField())
            )
        )
        context['collections'] = collections
        return context
