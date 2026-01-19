from rest_framework import serializers

from products.models import Brand, Collection, Image, Product


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
            'articul', 'title', 'description', 'price', 'is_published',
            'collection', 'brand', 'second_category', 'images',
            'created_at', 'update_at'
        )
