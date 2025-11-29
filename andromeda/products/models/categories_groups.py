from django.db import models

#from .products import SecondCategories
from .abstracts import BaseModel, PublishedModel


class Groups(PublishedModel, BaseModel):

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'


class MainCategories(PublishedModel, BaseModel):
    group = models.ForeignKey(
        Groups,
        on_delete=models.CASCADE,
        verbose_name="Группа"
    ),

    class Meta:
        verbose_name = 'Группа'
        verbose_name_plural = 'Группы'


class SecondCategories(PublishedModel, BaseModel):
    main_category = models.ForeignKey(
        MainCategories,
        on_delete=models.CASCADE,
        related_name="categories",
        verbose_name="Первичная категория"
    ),

    class Meta:
        verbose_name = 'Вторичная категория'
        verbose_name_plural = 'Вторичные категории'
