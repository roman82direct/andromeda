from django.contrib import admin

from .models import Brand, Collection, Image, Product
from .base_models.categories_groups import Group, MainCategory, SecondCategory


class CommonSettingsAdmin(admin.ModelAdmin):
    """
    Базовый класс админ-модели products.

    Определяет общие настройки интерфейса отображения объектов приложения
    в админ-панели.
    """

    list_display_links = ('title',)
    list_per_page = 10


class CommonCategoriesFieldsAdmin(CommonSettingsAdmin):
    """
    Базовый класс админ-модели products.

    Определяет настройки отображения полей категорий в админ-панели.
    """

    list_display = (
        'title',
        'description',
        'is_published',
    )


@admin.register(SecondCategory)
class SecondCategoryAdmin(CommonCategoriesFieldsAdmin):
    pass


class SecondCategoryInline(admin.TabularInline):
    model = SecondCategory
    extra = 1
    show_change_link = True


@admin.register(MainCategory)
class MaincategoryAdmin(CommonCategoriesFieldsAdmin):
    inlines = (SecondCategoryInline,)


class MainCategoryInline(admin.TabularInline):
    model = MainCategory
    extra = 1
    show_change_link = True


@admin.register(Group)
class GroupCategoryAdmin(CommonCategoriesFieldsAdmin):
    inlines = (MainCategoryInline,)


class ImageInline(admin.TabularInline):
    model = Image
    extra = 6
    show_change_link = True


@admin.register(Product)
class ProductAdmin(CommonSettingsAdmin):
    inlines = (ImageInline,)
    list_display = (
        'title',
        'item_number',
        'is_published',
        'price',
        'cost_price',
        'second_category',
        'brand',
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
    )
    list_editable = ('is_published', 'second_category', 'price')


@admin.register(Brand)
class BrandAdmin(CommonCategoriesFieldsAdmin):
    pass


@admin.register(Collection)
class CollectionAdmin(CommonCategoriesFieldsAdmin):
    pass
