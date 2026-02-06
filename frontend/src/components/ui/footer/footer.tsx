import {type FC} from 'react';
import styles from './footer.module.css'
import { Link } from 'react-router-dom';
import { Logo } from '../../logo/logo';
import { SubscribeForm } from '../../subscribe-form';
import { FooterListUI, type SubListLinks} from '../footer-list/footer-list';


type TFooterUIProps = {
  columnsListsLinks?: SubListLinks[][];
  socialLinksIcons: string[];
}


export const FooterUI:FC<TFooterUIProps> = ({columnsListsLinks, socialLinksIcons}) => {
    return (
      <footer className={styles['footer']}>
        <div className={styles['footer-content']}>
          <div className={styles["footer-head"]}>
            <Logo color={'dark-background'}/>
            <h3 className={styles['footer-title']}>
              Персональные предложения, ранний доступ к новым коллекциям и скидка 5% на первый заказ при подписке на рассылку
            </h3>
            <SubscribeForm/>
          </div>
          <div className={styles['footer-body']}>
              {
                columnsListsLinks && columnsListsLinks.map((column,indexColumn) => (
                  <div key={indexColumn} className={styles['footer-body-column']}>
                    <FooterListUI  listsLinks={column}/>
                  </div>
                ))
              }
          </div>
        </div>
        <div className={styles['footer-social']}>
          <div className={styles['footer-nav']}>Ссылки</div>
          <div className={styles['footer-copyright-logo']}>
            <Link className={styles['logo-link']} to={'/'}>© Andromeda</Link>
          </div>
          <div className={styles['footer-nav']}>Ссылки</div>
        </div>
      </footer>
    )
}


// Footer – главный контейнер футера.

// Footer-head – верхняя часть футера:

// Logo – логотип

// Subscribe – форма подписки (инпут + кнопка)

// Footer-nav – навигация футера:

// Footer-menu – меню

// Footer-list – список пунктов

// Footer-sublist – подсписки (например, ссылки в подкатегории)

// Footer-copyright – нижняя часть футера с копирайтом.