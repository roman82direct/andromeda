from django.core.validators import MinValueValidator
from django.db import models

#from .products import SecondCategories
from .abstracts import PublishedModel


class Groups(PublishedModel):
    title = models.CharField("Название", max_length=50, null=False),
    description = models.TextField("Описание"),

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'

    def __str__(self):
        return self.title
    

class MainCategories(PublishedModel):
    group = models.ForeignKey(
        Groups,
        on_delete=models.CASCADE,
        related_name="groups",
        verbose_name="Группа"
    ),
    title = models.CharField("Название", max_length=50, null=False),
    description = models.TextField("Описание"),

    class Meta:
        verbose_name = 'Первичная категория'
        verbose_name_plural = 'Первичные категории'

    def __str__(self):
        return self.title


class SecondCategories(PublishedModel):
    main_category = models.ForeignKey(
        MainCategories,
        on_delete=models.CASCADE,
        related_name="categories",
        verbose_name="Первичная категория"
    ),
    title = models.CharField("Название", max_length=50, null=False),
    description = models.TextField("Описание"),

    class Meta:
        verbose_name = 'Вторичная категория'
        verbose_name_plural = 'Вторичные категории'

    def __str__(self):
        return self.title
