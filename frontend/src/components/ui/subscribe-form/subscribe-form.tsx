import {  type ChangeEvent, type FC, type FormEvent } from "react";
import { IconButtonUI } from "../icon-button";
import { ButtonUI } from "../button";
import styles from "./subscribe-form.module.css";

type SubscribeFormUIProps = {
  onClear?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  email?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  isDisabled: boolean
};

export const SubscribeFormUI: FC<SubscribeFormUIProps> = ({
  email,
  onChange, //?
  onClear, // ?
  onSubmit,
  isDisabled,

}) => {



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
    console.log(e.currentTarget)
  }
 
  return (
    <form
      onSubmit={handleSubmit}
      name={"subscribe"}
      className={styles["subscribe-form"]}
    >
      <div className={styles['wrapper-subscribe-input']}>
        {/* прописать валидность поля? */}
        <input
          disabled = {isDisabled}
          className={styles["subscribe-input"]}
          onChange={onChange}
          name={"email"}
          value={email}
          type="email"
          placeholder={'Ваш e-mail'}
        />
        <div className={styles['wrapper-btn-clear']}>
        <IconButtonUI
          onClick={onClear}
          type={"reset"}
          isActive={false}
          iconClass={"close"}
          sizeIcon={20}
          colorIcon={'secondary'}
        />
      </div>
      </div>
      <div className={styles['wrapper-btn-subscribe']}>
        <ButtonUI  fullSize variant={'outlined'} color={'subscribe'} type={"submit"} onClick={() => {}}>
          Подписаться
        </ButtonUI>
      </div>
    </form>
  );
};
