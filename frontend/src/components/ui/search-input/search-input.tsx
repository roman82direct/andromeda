import { useState, type ChangeEvent, type CSSProperties, type FC } from "react";
import styles from "./search-input.module.css";
import { IconButtonUI } from "../icon-button/";
import { ListQueriesUI } from "../queries-list";
import type { TQuery } from "../queries-list/queries-list";

type TListQueries = {
  history?: TQuery[];
  popular?: TQuery[];
};

type SearchUIProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onDeleteQuery?: (id: string) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  listsQueries?: TListQueries;
};

export const SearchInputUI: FC<SearchUIProps> = ({
  placeholder,
  value,
  onChange,
  onClear,
  disabled = false,
  listsQueries,
  onSubmit,
  onDeleteQuery,
}) => {
  const [isFocused, toggleFocus] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleOnFocus = () => {
    toggleFocus(true);
  };

  const handleOnBlur = () => {
    toggleFocus(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    onSubmit?.(event); // продумать
  };
  const isHistory = (listsQueries?.history?.length ?? 0) > 0;
  const isPopular = (listsQueries?.popular?.length ?? 0) > 0;
  const iconSearchSize = 18;
  const iconClearSize = 12;
  const styleForIconSearch = {
    '--icon-search-width': `${iconSearchSize}px`
  } as CSSProperties
  return (
    <>
      <div style={styleForIconSearch} className={styles.wrapperForm}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.searchIconWrapper}>
            <IconButtonUI
              isDisabled={disabled}
              turnIcon={-1}
              type={"submit"}
              sizeIcon={iconSearchSize}
              isActive={false}
              iconClass={"search"}
            />
          </div>
          <div className={styles.searchInputContainer}>
            <input
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              disabled={disabled}
              className={styles.searchInput}
              type="search"
              onChange={handleChange}
              placeholder={placeholder}
              value={value}
            />
              <div className={styles['search-btn-close']}>
                <IconButtonUI
                  sizeIcon={iconClearSize}
                  onClick={onClear}
                  isActive={false}
                  iconClass={"close"}
                />
              </div>
           
          </div>
        </form>
      </div>
      {/* Выпадающий список популярных запросов и истории, который показывается при фокусе */}
      {isHistory && (
        <ListQueriesUI
          isShow={isFocused}
          title="История"
          listQueries={listsQueries?.history ?? []}
          onDelete={onDeleteQuery}
        />
      )}
      {isPopular && (
        <ListQueriesUI
          isShow={isFocused}
          title="Популярные запросы"
          listQueries={listsQueries?.popular ?? []}
          onDelete={onDeleteQuery}
        />
      )}
    </>
  );
};
