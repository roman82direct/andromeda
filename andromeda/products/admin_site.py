from django.contrib import admin


class ProductsAdminSite(admin.AdminSite):
    """
    Класс перенастройки поведения админ-панели.

    Переопределяем отображение интерфейса админки.
    """

    site_title = "Andromeda"
    index_title = "Админ-панель"
    site_header = "Andromeda: Панель Администратора"
    empty_value_display = "Не задано"
