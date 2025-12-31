from dataclasses import field
from tabnanny import verbose
from tkinter import NO
from turtle import mode
from django.db import models
from django.contrib.auth.models import AbstractUser

from .validators import validate_phone_number
from . import constants


class User(AbstractUser):
    phone = models.CharField(
        'Номер телефона',
        max_length=17,
        unique=True,
        validators=[validate_phone_number],
        help_text="Формат: +79991234567",
    )

    def __str__(self):
        return self.phone

    def save(self, *args, **kwargs):
        """
        Метод модели User.

        Переопределен так, чтобы в поле username сохранялся номер телефона.
        """
        self.username = self.phone
        super().save(*args, **kwargs)


class Address(models.Model):
    """Модель с адресами пользователей.

    """
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE,
                             verbose_name='Пользователь')
    country = models.CharField(max_length=constants.MAX_LENGTH_CHARFIELD,
                               verbose_name='Страна')
    city = models.CharField(max_length=constants.MAX_LENGTH_CHARFIELD,
                            blank=False,
                            verbose_name='Город')
    street = models.CharField(max_length=constants.MAX_LENGTH_CHARFIELD,
                              blank=False,
                              verbose_name='Улица')
    postal_code = models.PositiveIntegerField(verbose_name='Почтовый индекс')
    is_default = models.BooleanField(default=False,
                                     verbose_name='Адрес по умолчанию')

    class Meta:
        verbose_name = 'адрес'
        verbose_name_plural = 'Адреса'
        default_related_name = 'addresses'

    def __str__(self):
        return f'{self.country}, {self.city}, {self.street}.'
