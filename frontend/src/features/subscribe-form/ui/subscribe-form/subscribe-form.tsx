import { type ChangeEvent, type FC, type FormEvent } from "react";
import { ButtonUI } from "@/shared/ui/button";
import styles from "./subscribe-form.module.css";
import { InputUI } from "@/shared/ui/input";

type SubscribeFormUIProps = {
  onClear: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  isDisabled?: boolean;
  errorMessage?: string;
};

export const SubscribeFormUI: FC<SubscribeFormUIProps> = ({
  email,
  onChange,
  onClear,
  onSubmit,
  isDisabled,
  errorMessage,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      name={"subscribe"}
      className={styles["subscribe-form"]}
    >
      <div className={styles["wrapper-subscribe-input"]}>
        <InputUI
          onChange={onChange}
          type="email"
          placeHolder={"Ваш e-mail"}
          value={email}
          variant={"secondary"}
          nameInput="email"
          onClear={onClear}
          errorMessage={errorMessage}
        />
      </div>
      <div className={styles["wrapper-btn-subscribe"]}>
        <ButtonUI
          isDisabled={isDisabled}
          fullSize
          variant={"outlined"}
          color={"dark"}
          type={"submit"}
          onClick={() => {}}
        >
          Подписаться
        </ButtonUI>
      </div>
    </form>
  );
};
