from django.core.validators import MinValueValidator
from django.db import models

from .categories_groups import SecondCategories
from .abstracts import PublishedModel


class Collections(PublishedModel):
    title = models.CharField("Название", max_length=50, null=False),
    description = models.TextField("Описание"),

    class Meta:
        verbose_name = 'Коллекция'
        verbose_name_plural = 'Коллекции'

    def __str__(self):
        return self.title


class Brands(PublishedModel):
    title = models.CharField("Название", max_length=50, null=False),
    description = models.TextField("Описание"),

    class Meta:
        verbose_name = 'Брэнд'
        verbose_name_plural = 'Брэнды' 

    def __str__(self):
        return self.title


class Products(PublishedModel):
    item_number = models.PositiveIntegerField(
        null=False,
        unique=True,
        validators=[
            MinValueValidator(
                limit_value=0,
                message="Артикул не может быть отрицательным числом"
            )
        ],
        verbose_name='Артикул'
    )
    title = models.CharField("Название", max_length=50, null=False),
    description = models.TextField("Описание"),
    price = models.PositiveIntegerField(
        "Розничная цена",
        null=False,
        validators=[
            MinValueValidator(
                limit_value=0,
                message="Цена не может быть отрицательным числом"
            )
        ]
    ),
    cost_price = models.PositiveIntegerField(
        "Закупочная цена",
        null=False,
        validators=[
            MinValueValidator(
                limit_value=0,
                message="Цена не может быть отрицательным числом"
            )
        ],
    ),
    second_category = models.ForeignKey(
        SecondCategories,
        on_delete=models.SET_NULL,
        null=True,
        related_name="products",
        verbose_name="Вторичная категория"
    ),
    brand = models.ForeignKey(
        Brands,
        on_delete=models.SET_NULL,
        null=True,
        related_name="products",
        verbose_name="Брэнд",
    ),
    collections = models.ManyToManyField(
        Collections,
        verbose_name="Коллекция",
        blank=True
    )

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ('-created_at', '-update_at')

    def __str__(self):
        return self.title


class Images(PublishedModel):
    product = models.ForeignKey(
        Products,
        on_delete=models.CASCADE,
        related_name="products",
        verbose_name="Картинка",
    ),
    img_url = models.ImageField(
        'Картинка',
        upload_to='products_img',
        blank=True
    )
    is_main = models.BooleanField("Заглавная картинка"),
    is_pack = models.BooleanField("Пачка")

    class Meta:
        verbose_name = 'Картинка'
        verbose_name_plural = 'Картинки'

    def __str__(self):
        return self.title
