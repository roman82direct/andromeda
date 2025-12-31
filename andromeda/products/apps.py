from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig


class ProductsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'products'
    verbose_name = 'Товары'


class ProductsAdminConfig(AdminConfig):
    """
    Подкласс конфигурации админки.

    Переопределяет класс работы с админкой по умолчанию на кастомный подкласс
    ProductsAdminSite.

    """

    default_site = 'products.admin_site.ProductsAdminSite'
