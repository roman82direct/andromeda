from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


UserAdmin.fieldsets += (
    (None, {'fields': ('phone',)}),
)

admin.site.register(User, UserAdmin)
