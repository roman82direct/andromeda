import { type FC } from "react";
import styles from "./queries-list.module.css";
import { IconButtonUI } from "../icon-button/";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';

export type TQuery = {
  path: string;
  name: string;
  id: string;
};

export type ListQueriesProps = {
  title: string;
  listQueries: TQuery[]; // возмонжо сделать ссылку на соответствующий запрос ?
  isShow: boolean;
  onDelete?: (id: string) => void; // удалить данные о конкретном запросе - напр в истории
  onClearList?: () => void; // очистить вест список
};
//  cпециально для компонента поиска
export const ListQueriesUI: FC<ListQueriesProps> = ({
  title,
  listQueries = [], // возмонжо сделать ссылку на соответствующий запрос ?
  isShow = false,
  onDelete,
  onClearList,
}) => {
  return (
    <div className={clsx(styles.queries, isShow && styles.queriesOpened)}>
      <div className={styles.queryHeader}>
        <h3 className={styles.queryTitle}>{title}</h3>
        {onClearList && (
          <button onClick={onClearList} className={styles.queriesBtn}>
            очистить
          </button>
        )}
      </div>
      <ul className={styles.queryList}>
        {listQueries.map((query) => (
          <li key={uuidv4()} className={styles.query}>
            <Link to={`/${query.path}`} className={styles.queryLink}>
              <span className={styles.queryText}>{query.name}</span>
            </Link>
            {/* кнопка очистки запроса  необходимо что то передать в обработчик очистки запроса*/}
            <div className={styles.qeryIconWrapper}>
              <IconButtonUI
                sizeIcon={13}
                onClick={() => onDelete?.(query.id)}
                isActive={false}
                iconClass={"close"}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
