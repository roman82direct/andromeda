import phonenumbers

from rest_framework import serializers

from products.models import Brand, Collection, Image, Product


class SendCodeSerializer(serializers.Serializer):
    """
    Сериализатор для отправки кода подтверждения.

    Проверяет корректность и нормализует телефон в E.164 (+79123456789).
    """

    phone = serializers.CharField(max_length=20, required=True)

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
