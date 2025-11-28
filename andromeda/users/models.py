from django.db import models
from django.contrib.auth.models import AbstractUser

from .validators import validate_phone_number


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
