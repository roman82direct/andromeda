from operator import add
from django.contrib import admin

from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user_display', 'address_display', 'total_amount',
                    'status', 'created_at', 'paid_at')
    list_filter = ('status',)
    search_fields = ('user__username', 'user__last_name', 'user__id',
                     'user__email', 'id')
    autocomplete_fields = ('user',)

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')

    def user_display(self, obj: Order) -> str:
        """Возвращает ФИ пользователя.

        Args:
            obj: Объект модели Order

        Returns:
            - ФИ пользователя, если указаны.
            - {user.id}, если ФИ не заполнены.
            - '--', если пользователь не существует
        """
        user = obj.user
        if user:
            first_name = user.first_name if user.first_name else ''
            last_name = user.last_name if user.last_name else ''
            full_name = f'{last_name} {first_name}'.strip()
            if full_name:
                return full_name
            return str(user.id)
        return '--'
    user_display.short_description = 'Пользователь'

    def address_display(self, obj: Order) -> str:
        """Возвращает адрес зказа.

        Args:
            obj: Объект модели Order.

        Returns:
            - Адрес заказа в формате:{Страна}, {Город}, {Улица}.
            - '--', если адрес не указан.
        """
        address = obj.address
        country = address.country
        city = address.city
        street = address.street
        full_address = (f'{country}, {city}, {street}.').strip()
        if full_address:
            return full_address
        return '--'
    address_display.short_description = 'Адрес'

