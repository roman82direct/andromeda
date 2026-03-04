//  тип события при нажатии на иконку или кнопку с иконкой или просто кнопку
export type TEventType =
  | {
      trigger: "route";
      path: string;
    }
  | {
      trigger: "action-on-page";
      callback: () => void;
    };

export type TActionUser = TEventType & {
  title: string;
};
