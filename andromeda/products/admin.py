from django.contrib import admin

from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'item_number',
        'price',
        'cost_price',
        'brand',
        'second_category',
        'collection',
    )
    search_fields = (
        'title',
        'item_number',
    )
    list_filter = (
        'brand',
        'second_category',
        'collection',
        'second_category__main_category',
        'second_category__main_category__group',
    )
