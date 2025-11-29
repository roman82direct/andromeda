from django.core.validators import MinValueValidator
from django.db import models

from .categories_groups import SecondCategories
from .abstracts import BaseModel, PublishedModel


class Collections(PublishedModel, BaseModel):

    class Meta:
        verbose_name = 'Коллекция'
        verbose_name_plural = 'Коллекции'


class Brands(PublishedModel, BaseModel):

    class Meta:
        verbose_name = 'Брэнд'
        verbose_name_plural = 'Брэнды'


class Products(PublishedModel, BaseModel):
    item_number = models.CharField(
        max_length=50,
        unique=True,
        verbose_name='Артикул'
    )
    price = models.DecimalField(
        "Розничная цена",
        max_digits=8,
        decimal_places=2,
        default=0.0,
        validators=[
            MinValueValidator(
                limit_value=0.0,
                message="Цена не может быть отрицательным числом"
            )
        ]
    ),
    cost_price = models.DecimalField(
        "Закупочная цена",
        max_digits=8,
        decimal_places=2,
        default=0.0,
        validators=[
            MinValueValidator(
                limit_value=0.0,
                message="Цена не может быть отрицательным числом"
            )
        ]
    ),
    second_category = models.ForeignKey(
        SecondCategories,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Вторичная категория"
    ),
    brand = models.ForeignKey(
        Brands,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Брэнд",
    ),
    collections = models.ForeignKey(
        Collections,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Коллекция",
        blank=True
    )

    class Meta:
        default_related_name = 'products'
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ('-item_number')


class Images(PublishedModel):
    product = models.ForeignKey(
        Products,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="Картинка",
    ),
    img_url = models.ImageField(
        'Картинка',
        upload_to='products_img',
        blank=True
    )
    is_main = models.BooleanField("Заглавная картинка"),
    is_pack = models.BooleanField("Упаковка")

    class Meta:
        verbose_name = 'Картинка'
        verbose_name_plural = 'Картинки'

    def __str__(self):
        return self.title
