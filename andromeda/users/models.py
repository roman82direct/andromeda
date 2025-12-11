import random

from datetime import timedelta
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

from .validators import validate_phone_number


class User(AbstractUser):
    phone = models.CharField(
        'Номер телефона',
        max_length=17,
        unique=True,
        validators=[validate_phone_number],
        help_text='Формат: +79991234567',
    )

    def __str__(self):
        return self.username or self.phone


class SmsCode(models.Model):
    phone = models.CharField(
        max_length=17,
        validators=[validate_phone_number]
    )
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=['phone', 'code'])]

    @classmethod
    def generate_code(cls, phone: str) -> 'SmsCode':
        code = f'{random.randint(0, 999999):06d}'
        obj = cls.objects.create(phone=phone, code=code)
        # здесь вызываешь отправку SMS
        # send_sms(phone, f"Ваш код: {code}")
        print(code)
        return obj

    def is_expired(self) -> bool:
        return self.created_at < timezone.now() - timedelta(minutes=5)
