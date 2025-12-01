from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

from .base_models.abstracts import (
    IsPublishedUpdateAtAbstract,
    CreatedAtAbstract,
    TitleDescriptionAbstract
)
from .base_models.categories_groups import SecondCategory
from .services import image_path
from products.constants import (
    MAX_LENGTH_CHARFIELD,
    MAX_DIGITS_DECIMALFIELD,
    DECIMAL_PLACES_DECIMALFIELD,
    DEFAULT_DECIMALFIELD,
    LIMIT_VALUE_MINVALUEVALIDATOR_PRICES,
    SLICE_OUTPUT_STR_METHOD
)
from .managers import ProductManager


User = get_user_model()


class Collection(TitleDescriptionAbstract):
    """Модель с информацией о коллекции, к которой принадлежит товар."""

    class Meta:
        verbose_name = 'Коллекция'
        verbose_name_plural = 'Коллекции'


class Brand(TitleDescriptionAbstract):
    """Модель с данными о бренде товара."""

    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural = 'Бренды'


class Product(TitleDescriptionAbstract):
    """Модель с данными о товаре."""

    item_number = models.CharField(
        'Артикул',
        max_length=MAX_LENGTH_CHARFIELD,
        unique=True,
    )
    price = models.DecimalField(
        'Розничная цена',
        max_digits=MAX_DIGITS_DECIMALFIELD,
        decimal_places=DECIMAL_PLACES_DECIMALFIELD,
        default=DEFAULT_DECIMALFIELD,
        validators=[
            MinValueValidator(
                limit_value=LIMIT_VALUE_MINVALUEVALIDATOR_PRICES,
                message='Цена не может быть отрицательным числом'
            )
        ]
    )
    cost_price = models.DecimalField(
        'Закупочная цена',
        max_digits=MAX_DIGITS_DECIMALFIELD,
        decimal_places=DECIMAL_PLACES_DECIMALFIELD,
        default=DEFAULT_DECIMALFIELD,
        validators=[
            MinValueValidator(
                limit_value=LIMIT_VALUE_MINVALUEVALIDATOR_PRICES,
                message='Цена не может быть отрицательным числом'
            )
        ]
    )
    second_category = models.ForeignKey(
        SecondCategory,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Подкатегория'
    )
    brand = models.ForeignKey(
        Brand,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Бренд',
    )
    collection = models.ForeignKey(
        Collection,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Коллекция',
        blank=True
    )

    class Meta:
        default_related_name = 'products'
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        ordering = ('item_number',)

    objects = models.Manager()
    get_products = ProductManager()


class Image(IsPublishedUpdateAtAbstract):
    """Модель с данными об изображениях товара."""

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        verbose_name='Товар',
    )
    img_url = models.ImageField(
        'Путь к картинке',
        upload_to=image_path,
        blank=True
    )
    is_main = models.BooleanField('Заглавная картинка')
    is_pack = models.BooleanField('Упаковка')

    class Meta:
        verbose_name = 'Картинка товара'
        verbose_name_plural = 'Картинки товара'
        default_related_name = 'images'

    def __str__(self):
        return str(self.img_url)


class Comment(CreatedAtAbstract):
    """Модель с отзывами о товаре."""

    text = models.TextField('Комментарий')
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        verbose_name='Товар'
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Автор'
    )
    rating = models.IntegerField(
        null=True,
        verbose_name='Рейтинг',
        help_text=('Рейтинг от 1 до 5'),
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )

    class Meta():
        verbose_name = 'Отзыв на товар'
        verbose_name_plural = 'Отзывы на товар'
        default_related_name = 'comments'
        ordering = ('-created_at',)

    def __str__(self):
        return self.text[:SLICE_OUTPUT_STR_METHOD]
