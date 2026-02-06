import {type FC} from 'react';
import styles from './footer-list.module.css'
import { Link } from 'react-router-dom';

export type TLink = {
  linkTitle: string;
  path: string;
}

export type SubListLinks = {
  title: string;
  links: TLink[]
}

type FooterListProps = {
  listsLinks: SubListLinks[]
}


export const FooterListUI:FC<FooterListProps> = ({
   listsLinks
}) => {
    return (
      <div className={styles['lists-links-container']}>
        {   listsLinks.map((subList,index)=>(
          <div key={index}>
            <h3 className={styles['list-links-title']}>{subList.title}</h3>
            <ul className={styles['list-links']}>
             { subList.links.map((linkElem,indexElem) =>(
                    <li key={indexElem}>
                      <Link className={styles['list-link']} to={`${linkElem.path}`}>{linkElem.linkTitle}</Link>
                    </li>
                
              ))}
              </ul> 
            
            
          </div>
        ))}
      </div>
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