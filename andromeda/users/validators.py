import phonenumbers

from django.core.exceptions import ValidationError


def validate_phone_number(value):
    """Валидатор проверки телефонного номера при авторизации."""
    try:
        parsed = phonenumbers.parse(value, 'RU')
        if not phonenumbers.is_valid_number(parsed):
            raise ValidationError('Некорректный номер телефона.')
    except phonenumbers.NumberParseException:
        raise ValidationError('Некорректный формат номера.')
