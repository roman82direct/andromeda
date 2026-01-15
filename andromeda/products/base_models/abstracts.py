from django.db import models
from django.utils import timezone

from products.constants import ART_LENGTH, MAX_LENGTH_CHARFIELD


class CreatedAtAbstract(models.Model):
    """
    Абстрактная модель.

    Добавляет дату и время создания записи в наследуемой модели.
    """

    created_at = models.DateTimeField(
        default=timezone.now,
        verbose_name='Добавлено'
    )

    class Meta:
        abstract = True


class UpdatedAtAbstract(models.Model):
    """
    Абстрактная модель.

    Добавляет дату и время обновления записи в наследуемой модели.
    """

    updated_at = models.DateTimeField(
        default=timezone.now,
        verbose_name='Изменено'
    )

    class Meta:
        abstract = True


class IsPublishedUpdateAtAbstract(CreatedAtAbstract):
    """
    Абстрактная модель.

    Добавляет флаг is_published(Опубликовано) и поле update_at(Обновление)
    к наследуемой модели.
    Также наследует от CreatedAtAbstract
    и передает дочерним моделям автоматическое заполнение
    даты и время создания записи.
    """

    is_published = models.BooleanField(
        default=True,
        verbose_name='Опубликовано',
        help_text='Снимите галочку, чтобы скрыть публикацию.'
    )
    update_at = models.DateTimeField(
        default=timezone.now,
        verbose_name='Обновлено'
    )

    class Meta:
        abstract = True


class TitleDescriptionAbstract(IsPublishedUpdateAtAbstract):
    """
    Абстрактная модель.

    Добавляет поля articul, title(наименование), description(Описание).
    Наследует от других абстрактных моделей, добавляя:
    - автоматическое заполнение даты и время создания записи,
    - флаг is_published(Опубликовано) и поле update_at(Обновление)
    """

    articul = models.CharField('Артикул', unique=True, max_length=ART_LENGTH)
    title = models.CharField('Название', max_length=MAX_LENGTH_CHARFIELD)
    description = models.TextField('Описание', blank=True)

    class Meta:
        abstract = True
        ordering = ('articul')
        constraints = [
            models.UniqueConstraint(
                fields=('articul', 'title'),
                name='unique_articul_title'
            )
        ]
        indexes = [
            models.Index(fields=('articul', 'created_at',))
        ]

    def __str__(self):
        return self.title
