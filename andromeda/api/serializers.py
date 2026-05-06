import phonenumbers

from django.core.cache import cache
from rest_framework import serializers

from products.models import Brand, Collection, Image, Product


class PhoneSerializerMixin(serializers.Serializer):
    """
    Миксин для валидации и нормализации телефонных номеров в E.164 формате.

    Поддерживает форматы: 89123456789, +7(912)345-67-89 → +79123456789.
    """

    phone = serializers.CharField(max_length=17, required=True)

    def validate_phone(self, number):
        try:
            parse_phone = phonenumbers.parse(number, 'RU')
        except phonenumbers.NumberParseException as e:
            raise serializers.ValidationError(
                f'{number}: неверный формат номера.'
            ) from e

        if not phonenumbers.is_valid_number(parse_phone):
            raise serializers.ValidationError(
                f'{parse_phone}: неверный номер телефона.'
            )

        phone = phonenumbers.format_number(
            parse_phone, phonenumbers.PhoneNumberFormat.E164
        )
        return phone


class SendCodeSerializer(PhoneSerializerMixin):
    """
    Сериализатор для отправки кода подтверждения.

    Проверяет корректность и нормализует телефон в E.164 (+79123456789).
    """


class VerifyCodeSerializer(PhoneSerializerMixin):
    """
    Верификация SMS-кода подтверждения.

    Сверяет код из запроса с тем, что хранится в Redis.
    """

    code = serializers.CharField(max_length=7, required=True)

    def validate(self, data):
        phone, code = data.get('phone'), data.get('code')
        stored_code = cache.get(f'otp_{phone}')
        if not stored_code or stored_code != code:
            raise serializers.ValidationError('Неверный код.')
        return data


class BrandSerializer(serializers.ModelSerializer):
    """Сериализатор модели Brand."""

    class Meta:
        model = Brand
        fields = ('title', 'description',)


class CollectionSerializer(serializers.ModelSerializer):
    """Сериализатор модели Collection."""

    class Meta:
        model = Collection
        fields = ('title', 'description',)


class ImageSerializer(serializers.ModelSerializer):
    """Сериализатор модели Image."""

    class Meta:
        model = Image
        fields = ('img_url', 'is_main', 'is_pack')


class ProductSerializer(serializers.ModelSerializer):
    """Сериализатор модели Product."""

    brand = BrandSerializer(read_only=True)
    collection = CollectionSerializer(read_only=True)
    second_category = serializers.SlugRelatedField(
        slug_field='title', read_only=True
    )
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'articul', 'title', 'description', 'price', 'is_published',
            'collection', 'brand', 'second_category', 'images',
            'created_at', 'update_at'
        )
