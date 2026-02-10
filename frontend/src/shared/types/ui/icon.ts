export type TIconClassCssIcon =
  | "close"
  | "come-in"
  | "search"
  | "global"
  | "read"
  | "info"
  | "clock"
  | "location"
  | "cart"
  | "heart"
  | "full-heart"
  | "profile"
  | "home"
  | "youtube"
  | "facebook"
  | "visa"
  | "instagram"
  | "mastercard";

//  тип события при нажатии на иконку или кнопку с иконкой
  export type TEventType =
    | {
        trigger: "route";
        path: string;
      }
    | {
        trigger: "action-on-page";
        callback: () => void;
    };
  
  export type TIconType = {
    typeIcon: TIconClassCssIcon;
    counterNum?: number;
    typeEvent: TEventType;
  };