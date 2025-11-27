from django.views.generic import ListView


class CollectionsList(ListView):
    """Test View."""

    template_name = 'goods/index.html'
    # Add some kjbnkjxcbj
    def get_queryset(self):
        pass

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['products'] = [
            {
                'name': 'Product_1',
                'category': 'Category_1',
                'collection': 'Collection_1',
                'price': 100,
                'url': 'products_img/plug_1.jpg'
            },
            {
                'name': 'Product_2',
                'category': 'Category_2',
                'collection': 'Collection_2',
                'price': 200,
                'url': 'products_img/plug_2.jpg'
            },
        ]
        context['collections'] = [
            {
                'name': 'Collection_1',
                'url': 'collections_img/plug_1.jpg'
            },
            {
                'name': 'Collection_2',
                'url': 'collections_img/plug_2.jpg'
            },
        ]
        return context
