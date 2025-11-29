from django.db import models


from .abstracts import TitleDescriptionAbstract


class Group(TitleDescriptionAbstract):
    """
    Модель с данными о группе.

    Группа - общевидовой признак принадлежности товара()
    (пример:посуда, текстить).
    Наследует от абстрактной модели поля:
    - created_at,
    - is_published,
    - update_at,
    - title,
    - description.
    """

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'


class MainCategory(TitleDescriptionAbstract):
    """
    Модель с данными о категории товара.

    Деление внутри группы товаров.
    Наследует от абстрактной модели поля:
    - created_at,
    - is_published,
    - update_at,
    - title,
    - description,
    - метод str().
    """

    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        verbose_name="Группа"
    )

    class Meta:
        verbose_name = 'Категория товаров'
        verbose_name_plural = 'Категории товаров'
        default_related_name = 'maincategories'


class SecondCategory(TitleDescriptionAbstract):
    """Модель с данными о подкатегории товара.

    Деление внутри категориитовара.
    Наследует от абстрактной модели поля:
    - created_at,
    - is_published,
    - update_at,
    - title,
    - description,
    - метод str().
    """

    main_category = models.ForeignKey(
        MainCategory,
        on_delete=models.CASCADE,
        verbose_name='Категория товаров'
    )

    class Meta:
        verbose_name = 'Подкатегория'
        verbose_name_plural = 'Подкатегории'
        default_related_name = 'secondcategories'
