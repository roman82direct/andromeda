from django.contrib import admin

from .models import Cart, CartItem


class CartItemInLine(admin.TabularInline):
    model = CartItem
    extra = 1
    show_change_link = True


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    inlines = (CartItemInLine, )
