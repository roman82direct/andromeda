from django.db import models
from django.utils import timezone

from orders.models import Order


class Delivery(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE,
                              verbose_name='Заказ')
    is_done = models.BooleanField(default=False, verbose_name='Выполнен')
    created_at = models.DateTimeField(default=timezone.now,
                                      verbose_name='Добавлено'
                                      )

    class Meta:
        verbose_name = 'Доставка'
        verbose_name_plural = 'Доставки'
        default_related_name = 'deliveries'

    def __str__(self):
        return f'Заказ №: {self.id}'
