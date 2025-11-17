from django.views.generic import ListView


class IndexList(ListView):
    """Test View."""

    template_name = 'goods/index.html'

    def get_queryset(self):
        pass

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
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
