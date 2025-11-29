from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from .abstracts import (
    IsPublishedUpdateAtAbstract,
    CreatedAtAbstract,
    TitleDescriptionAbstract
)
from .categories_groups import SecondCategory
from products.constants import (
    MAX_LENGTH_CHARFIELD,
    MAX_DIGITS_DECIMALFIELD,
    DECIMAL_PLACES_DECIMALFIELD,
    DEFAULT_DECIMALFIELD,
    LIMIT_VALUE_MINVALUEVALIDATOR_PRICES,
    SLICE_OUTPUT_STR_METHOD
)
from users.models import User


class Collection(TitleDescriptionAbstract):
    """Модель с информацией о коллекции, к которой принадлежит товар.

        Наследует от абстрактной модели поля:
    - created_at,
    - is_published,
    - update_at,
    - title,
    - description,
    - метод str().
    """

    class Meta:
        verbose_name = 'Коллекция'
        verbose_name_plural = 'Коллекции'


class Brand(TitleDescriptionAbstract):
    """Модель с данными о бренде товара.

    Наследует от абстрактной модели поля:
    - created_at,
    - is_published,
    - update_at,
    - title,
    - description,
    - метод str().
    """

    class Meta:
        verbose_name = 'Брэнд'
        verbose_name_plural = 'Брэнды'


class Product(TitleDescriptionAbstract):
    """Модель с данными о товаре.

    Наследует от абстрактной модели поля:
    - created_at,
    - is_published,
    - update_at,
    - title,
    - description,
    - метод str().
    """

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
        verbose_name='Вторичная категория'
    )
    brand = models.ForeignKey(
        Brand,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Брэнд',
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
        ordering = ('-item_number')


class Image(IsPublishedUpdateAtAbstract):
    """Модель с данными об изображениях товара.

    Наследует от абстрактной модели поля:
    - created_at,
    - is_published,
    - update_at.
    """

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        verbose_name='Товар',
    )
    img_url = models.ImageField(
        'Путь к картинке',
        upload_to='products_img',
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
    """Модель с отзывами о товаре.

    Наследует от абстрактной модели поле
    - created_at.
    """

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
        verbose_name_plural = 'Отзывы натовар'
        default_related_name = 'comments'
        ordering = ('-created_at',)

    def __str__(self):
        return self.text[:SLICE_OUTPUT_STR_METHOD]
