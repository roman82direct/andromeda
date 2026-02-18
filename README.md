# andromeda
Online store: Andromeda – интернет‑магазин товаров для дома, выполненный на стеке Django REST Framework (backend) и React-Vue-Vite (frontend).

Проект реализует REST API для каталога товаров, корзины и операций с заказами, и современный SPA‑интерфейс на React для взаимодействия с пользователем.

Доступ к системе осуществляется посредством **OTP-кодов** и **JWT-токенов**.

# Backend part

## **Использованные технологии**

| Технология | Описание | Ссылка на документацию |
|------------|----------|--------------|
| **Django 6.0** | **Мощный веб-фреймворк** с ORM, админкой, системой аутентификации для быстрого и безопасного создания веб‑приложений и API. Архитектура MTV. | [Официальная](https://docs.djangoproject.com/) |
| **Django REST Framework 3.16** | **Инструментарий для REST API**. ViewSet, сериализаторы, пагинация, авторизация, автоматическая документация. | [Официальная](https://www.django-rest-framework.org) |
| **djangorestframework-simplejwt** | **JWT-аутентификация**. Современные access/refresh токены с ротацией. **Замена сессиям**. | [Официальная](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) |
| **django-redis 6.0** | **Интеграция Redis** как backend для кеширования в Django (кеширование запросов, сессий и т.п.). | [Официальная](https://github.com/jazzband/django-redis) |
| **drf-spectacular** | Генерация **OpenAPI** 3 схемы и интерактивной документации для DRF‑API. | [Официальная](https://drf-spectacular.readthedocs.io/) |
| **phonenumbers 9.0.19** | Библиотека для парсинга, нормализации и валидации телефонных номеров. | (https://github.com/daviddrysdale/python-phonenumbers) |
| **import-export** | Инструменты **импорта и экспорта данных** (например, в админке Django) в различные форматы (CSV, XLSX). | [Официальная](https://django-import-export.readthedocs.io/) |
| **Pillow 11** | **Библиотека для обработки изображений** (загрузка, ресайз, конвертация форматов и т.п.)., **base64-декодирование**. | [Официальная](https://pillow.readthedocs.io/) |


## Установка и запуск django-проекта
1. Клонируйте репозиторий и перейдите в него:

```bash
git clone git@github.com:roman82direct/andromeda.git
cd andromeda
```

2. Создайте и активируйте виртуальное окружение:

```bash
python -m venv venv
source venv/bin/activate  # На Windows: . venv\Scripts\activate
```

3. Установите зависимости:

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

4. Выполните миграции:

```bash
python manage.py migrate
```

5. Запустите проект:

```bash
python manage.py runserver
```

6. **Документация API** доступна в OpenAPI (schema.yaml) или по адресу http://127.0.0.1:8000/api/docs/ после запуска Django‑проекта.



# Frontend part

## Инструкция по запуску проекта на Vite:
  1. Скачайте и установите Node.js с официального сайта: [https://nodejs.org/en](https://nodejs.org/en)  
   *Рекомендуется версия LTS.* на свой компьютер
  2. В корне проекта в терминале переходим `cd frontend`
  3. Установим все зависимости проекта (см. файл package.json) `npm install`
  4. запуск сервера `npm run dev` => http://localhost:5173
  5. сборка prodaction `npm run build`
  6. просмотр отдельных компонентов `npm run storybook` => http://localhost:6006

## Пример описания структуры проекта

Пример структуры для AppHeader
```text
src/
└─ components/
   ├─ ui/
   │  └─ app-header/
   │     ├─ app-header.tsx        # чистый UI компонент
   │     ├─ app-header.module.css # стили
   │     ├─ app-header.stories.tsx# Storybook
   │     ├─ types.ts              # типы, если их много
   │     └─ index.ts              # export { AppHeaderUI } from './app-header';
   └─ app-header/
      ├─ app-header.tsx           # компонент с логикой
      └─ index.ts                  # export { AppHeader } from './app-header';
```
## Пример кода UI-компонента
// src/components/ui/app-header/app-header.tsx
```tsx
import { FC } from 'react';
import styles from './app-header.module.css';

type Props = {
  userName?: string;
};

export const AppHeaderUI: FC<Props> = ({ userName }) => (
  <header className={styles.header}>
    <h1>Welcome, {userName || 'Guest'}</h1>
  </header>
);
```

## Пример кода компонента с логикой
  src/components/app-header/app-header.tsx

  ```tsx
  import { FC } from 'react';
  import { AppHeaderUI } from '@ui/app-header';
  import { useSelector } from '../../services/store';

  export const AppHeader: FC = () => {
    const userName = useSelector((store) => store.user.data?.name);
    return <AppHeaderUI userName={userName} />;
  };

  ```

## Индекс для экспорта
src/components/ui/app-header/index.ts

` export { AppHeaderUI } from './app-header'; `

src/components/app-header/index.ts

` export { AppHeader } from './app-header'; `

Это даёт возможность импортировать компоненты удобно через алиасы:

` import { AppHeader } from '@components'; `

` import { AppHeaderUI } from '@ui'; `