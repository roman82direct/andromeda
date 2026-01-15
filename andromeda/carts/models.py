from django.contrib.auth import get_user_model
from django.db import models

from products.base_models.abstracts import CreatedAtAbstract, UpdatedAtAbstract
from products.models import Product
from products.constants import (
    MAX_DIGITS_DECIMALFIELD, DECIMAL_PLACES_DECIMALFIELD
)


User = get_user_model()


class Cart(CreatedAtAbstract, UpdatedAtAbstract):
    """Модель пользовательской корзины."""

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, verbose_name='Покупатель'
    )

    @property
    def total_price(self):
        """Общая стоимость корзины."""
        return self.cart_items.aggregate(
            total=models.Sum(models.F('unit_price') * models.F('quantity'))
        )['total'] or 0

    @property
    def total_quantity(self):
        """Общее количество товаров."""
        return sum(item.quantity for item in self.cart_items.all())

    @property
    def item_count(self):
        """Количество уникальных товаров."""
        return self.cart_items.count()

    class Meta:
        default_related_name = 'carts'
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'
        indexes = [models.Index(fields=('user',))]

    def __str__(self):
        return (
            f'Корзина {self.user.username} ({self.item_count} товаров, '
            f'{self.total_price:.2f} ₽)'
        )


class CartItem(CreatedAtAbstract, UpdatedAtAbstract):
    """Модель товаров в корзине."""

    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, verbose_name='Корзина'
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, verbose_name='Товар'
    )
    quantity = models.PositiveSmallIntegerField('Количество')
    unit_price = models.DecimalField(
        'Отпускная цена',
        max_digits=MAX_DIGITS_DECIMALFIELD,
        decimal_places=DECIMAL_PLACES_DECIMALFIELD,
    )

    class Meta:
        default_related_name = 'cart_items'
        verbose_name = 'Товар в корзине'
        verbose_name_plural = 'Товары в корзине'
        constraints = [
            models.UniqueConstraint(
                fields=('cart', 'product',),
                name='unique_cart_product'
            )
        ]
        indexes = [
            models.Index(fields=('cart', 'created_at',))
        ]

    def __str__(self):
        return (
            f'{self.product} × {self.quantity} по {self.unit_price}₽ '
            f'(корзина {self.cart.id})'
        )
