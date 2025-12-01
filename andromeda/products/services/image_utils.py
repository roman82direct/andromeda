from typing import cast

from products.constants import PRODUCTS_IMG_PATH


def image_path(instance, filename):
    """
    Возвращает путь для сохранения изображения.

    Включая имя файла с нужным префиксом.
    """
    image = cast('models.Image', instance)
    product_title = image.product.item_number

    ext = filename.split('.')[-1].lower()
    if image.is_main:
        path = f'{PRODUCTS_IMG_PATH}{product_title}_main.{ext}'
    elif image.is_pack:
        path = f'{PRODUCTS_IMG_PATH}{product_title}_pack.{ext}'
    else:
        path = f'{PRODUCTS_IMG_PATH}{product_title}.{ext}'
    return path
