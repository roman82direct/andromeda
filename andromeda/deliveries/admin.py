from django.contrib import admin

from .models import Delivery


@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('order', 'is_done', 'created_at')
    search_fields = ('order__id', 'order__user__username',
                     'order__user__last_name', 'order__user__id',
                     'order__user__email')
    autocomplete_fields = ('order',)

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('order__user')
