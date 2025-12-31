from asyncio.windows_events import NULL
from statistics import mode
from tabnanny import verbose
from django.db import models
from django.utils import timezone

from users.models import User, Address
from . import constants


class Order(models.Model):
    """Модель с заказами пользователей

    """
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE,
                             verbose_name='Пользователь')
    address = models.ForeignKey(Address,
                                on_delete=models.CASCADE,
                                verbose_name='Адрес')
    total_amount = models.DecimalField(max_digits=10,
                                       decimal_places=2,
                                       verbose_name='Сумма заказа')
    status = models.CharField(choices=constants.STATUS_CHOICES,
                              default='pending')
    created_at = models.DateTimeField(default=timezone.now,
                                      verbose_name='Добавлено'
                                      )
    paid_at = models.DateField(null=True, blank=True, verbose_name='Оплачено')

    class Meta:
        verbose_name = 'заказ'
        verbose_name_plural = 'Заказы'
        default_related_name = 'orders'

    def __str__(self):
        return f'Заказ №: {self.id}'
