import { type ChangeEvent, type FC } from "react";
import styles from "./input.module.css";
import { IconButtonUI } from "../icon-button";
import clsx from "clsx";

type TInputUIProps = {
  isDisabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: "text" | "password" | "email" | "search" | "tel" | "url";
  placeHolder: string;
  onClear: () => void;
  nameInput: string;
  errorMessage?: string;
  variant: "primary" | "secondary";
};

export const InputUI: FC<TInputUIProps> = ({
  isDisabled,
  onChange,
  value,
  type,
  placeHolder,
  onClear,
  nameInput,
  errorMessage,
  variant,
}) => {
  const inputClassName = clsx(
    styles["input"],
    variant === "primary" ? styles["input-primary"] : styles["input-secondary"],
  );
  return (
    <div className={styles["container-input"]}>
      <div className={styles["input-wrapper"]}>
        <input
          disabled={isDisabled}
          className={inputClassName}
          onChange={onChange}
          name={nameInput}
          value={value}
          type={type}
          placeholder={placeHolder}
        />
        {errorMessage && (
          <p className={styles["input-error"]}>{errorMessage}</p>
        )}
      </div>
      <div className={styles["wrapper-btn-clear"]}>
        <IconButtonUI
          onClick={onClear}
          isActive={false}
          iconClass={"close"}
          sizeIcon={15}
          colorIcon={variant}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
};
