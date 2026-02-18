from django.db.models import F
from import_export.fields import Field
from import_export.resources import ModelResource
from import_export.widgets import ForeignKeyWidget

from .models import Product, Brand, Collection
from .base_models.categories_groups import Group, MainCategory, SecondCategory


class ProductResource(ModelResource):
    """
    Ресурс класс для импорта Продуктов.

    Импортирует все зависимые группы, категории, подкатегории,
    также обновляет данные.
    """

    group_articul = Field(
        attribute='group_articul',
        column_name='group_articul'
    )
    group_title = Field(
        attribute='group_title',
        column_name='group_title'
    )
    group_description = Field(
        attribute='group_description',
        column_name='group_description'
    )
    MainCategory_articul = Field(
        attribute='MainCategory_articul',
        column_name='MainCategory_articul'
    )
    MainCategory_title = Field(
        attribute='MainCategory_title',
        column_name='MainCategory_title'
    )
    MainCategory_description = Field(
        attribute='MainCategory_description',
        column_name='MainCategory_description'
    )
    SecondCategory_articul = Field(
        attribute='SecondCategory_articul',
        column_name='SecondCategory_articul'
    )
    SecondCategory_title = Field(
        attribute='SecondCategory_title',
        column_name='SecondCategory_title'
    )
    SecondCategory_description = Field(
        attribute='SecondCategory_description',
        column_name='SecondCategory_description'
    )
    articul = Field(attribute='articul', column_name='Product_articul')
    title = Field(attribute='title', column_name='Product_title')
    description = Field(
        attribute='description',
        column_name='Product_description'
    )
    price = Field(attribute='price', column_name='Product_price')
    cost_price = Field(attribute='cost_price',
                       column_name='Product_cost_price')
    brand = Field(
        attribute='brand',
        column_name='Product_brand',
    )
    collection = Field(
        attribute='collection',
        column_name='Product_collection',
    )
    second_category = Field(attribute='second_category',
                            column_name='SecondCategory_id')

    class Meta:
        fields = ('group_articul', 'group_title', 'group_description',
                  'MainCategory_articul', 'MainCategory_title',
                  'MainCategory_description', 'SecondCategory_articul',
                  'SecondCategory_title', 'SecondCategory_description',
                  'articul', 'title', 'description', 'price',
                  'cost_price', 'brand', 'collection', 'second_category')
        model = Product
        import_id_fields = ['articul']

    def before_import(self, dataset, **kwargs):
        dataset.headers.append('SecondCategory_id')
        super().before_import(dataset, **kwargs)

    def before_import_row(self, row, **kwargs):

        def update_group_category(object, field_part, model, row=row):
            fields_to_update = {}

            for field_name in [f'{field_part}_articul', f'{field_part}_title',
                               f'{field_part}_description']:
                if field_name in row:
                    current_value = getattr(object, field_name.split('_')[1],
                                            None)
                    new_value = row[field_name]

                    if current_value != new_value:
                        fields_to_update[field_name.split('_')[1]] = new_value

            if fields_to_update:
                model.objects.filter(id=object.pk).update(**fields_to_update)

        group = Group.objects.filter(articul=row['group_articul']).first()

        if not group:
            Group.objects.create(
                articul=row['group_articul'],
                title=row['group_title'],
                description=row['group_description'],
                is_published=False
            )
        else:
            update_group_category(group, 'group', Group)
        maincategory = MainCategory.objects.filter(
            articul=row['MainCategory_articul']
        ).first()
        if not maincategory:
            MainCategory.objects.create(
                articul=row['MainCategory_articul'],
                title=row['MainCategory_title'],
                description=row['MainCategory_description'],
                group=Group.objects.get(articul=row['group_articul']),
                is_published=False
            )
        else:
            update_group_category(maincategory, 'MainCategory', MainCategory)

        secondcategory = SecondCategory.objects.filter(
            articul=row['SecondCategory_articul']
        ).first()
        if not secondcategory:
            secondcategory = SecondCategory.objects.create(
                articul=row['SecondCategory_articul'],
                title=row['SecondCategory_title'],
                description=row['SecondCategory_description'],
                main_category=MainCategory.objects.get
                (
                    articul=row['MainCategory_articul']
                ),
                is_published=False
            )
        else:
            update_group_category(secondcategory, 'SecondCategory',
                                  SecondCategory)
            secondcategory = SecondCategory.objects.get(
                articul=row['SecondCategory_articul']
            )
        row['SecondCategory_id'] = secondcategory
        return super().before_import_row(row, **kwargs)

    def before_save_instance(self, instance, row, **kwargs):
        instance.is_published = False

    def export_resource(self, instance, selected_fields=None, **kwargs):
        """Переопределяет инстенс при экспорте товара.
        Добавляет зависимые модели
        """
        instance = Product.objects.select_related(
            'second_category__main_category__group'
        ).filter(pk=instance.id).annotate(
            group_articul=F('second_category__main_category__group__articul'),
            group_title=F('second_category__main_category__group__title'),
            group_description=F(
                'second_category__main_category__group__description'),
            MainCategory_articul=F('second_category__main_category__articul'),
            MainCategory_title=F('second_category__main_category__title'),
            MainCategory_description=F(
                'second_category__main_category__description'),
            SecondCategory_articul=F('second_category__articul'),
            SecondCategory_title=F('second_category__title'),
            SecondCategory_description=F('second_category__description'),
        ).values(
            'group_articul', 'group_title', 'group_description',
            'MainCategory_articul', 'MainCategory_title',
            'MainCategory_description', 'SecondCategory_articul',
            'SecondCategory_title', 'SecondCategory_description', 'articul',
            'title', 'description', 'price', 'cost_price', 'brand',
            'collection').first()

        return super().export_resource(instance, selected_fields, **kwargs)
