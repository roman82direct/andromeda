from django.db import models

from .abstracts import TitleDescriptionAbstract


class GroupManager(models.Manager):
    """Кастомный менеджер модели Group."""

    def get_navbar_items(self):
        """Функция получения ссылок для меню."""
        return (
            self.filter(is_published=True)
            .prefetch_related(
                models.Prefetch(
                    'maincategories',
                    queryset=MainCategory.objects
                    .filter(is_published=True)
                    .prefetch_related(
                        models.Prefetch(
                            'secondcategories',
                            queryset=SecondCategory.objects.filter(
                                is_published=True
                            ),
                        )
                    )
                    .order_by('articul'),
                    to_attr='main_cats',
                )
            ).order_by('articul')
        )


class Group(TitleDescriptionAbstract):
    """
    Модель с данными о группе.

    Группа - общевидовой признак принадлежности товара
    (пример: посуда, текстиль).
    """

    objects = models.Manager()
    navigation = GroupManager()

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'


class MainCategory(TitleDescriptionAbstract):
    """
    Модель с данными о категории товара.

    Деление внутри группы товаров.
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
    """
    Модель с данными о подкатегории товара.

    Деление внутри категории товара.
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
