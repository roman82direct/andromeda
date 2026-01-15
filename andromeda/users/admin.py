from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Address, User


UserAdmin.fieldsets += (
    (None, {'fields': ('phone',)}),
)

admin.site.register(User, UserAdmin)


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user_display', 'country', 'city',
                    'street', 'postal_code', 'is_default')
    list_filter = ('country',)
    search_fields = ('user__username', 'user__last_name', 'user__id',
                     'user__email')

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')

    def user_display(self, obj: Address) -> str:
        """Возвращает ФИ пользователя.

        Args:
            obj: Объект модели Adress

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
