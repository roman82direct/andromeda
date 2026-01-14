# andromeda
Online store: Andromeda - household goods.


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