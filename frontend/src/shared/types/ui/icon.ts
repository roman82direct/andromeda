import type { TEventType } from "../types";

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
  | "mastercard"
  | "arrow-left"
  | "arrow-right"
  | "ellipse-emptied"
  | "ellipse-filled"
  | "burger"
  | "arrow-top";

export type TIconType = {
  typeIcon: TIconClassCssIcon;
  counterNum?: number;
  typeEvent: TEventType;
};
