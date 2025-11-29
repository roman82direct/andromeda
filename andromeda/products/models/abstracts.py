from django.db import models


class PublishedModel(models.Model):
    """Абстрактная модель. Добвляет флаг is_published."""

    is_published = models.BooleanField(
        default=True,
        verbose_name='Опубликовано',
        help_text='Снимите галочку, чтобы скрыть публикацию.'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Добавлено'
    )
    update_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Обновлено'
    )

    class Meta:
        abstract = True


class BaseModel(models.Model):
    """Абстрактная модель. Добвляет title, description."""

    title = models.CharField("Название", max_length=50),
    description = models.TextField("Описание"),

    def __str__(self):
        return self.title
