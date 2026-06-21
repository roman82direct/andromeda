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

export type TThemeElementsPage = "primary" | "secondary";

//  для картинок

export type TImageSrc = string;

export type TPathsImage = {
  "1x": TImageSrc;
  "2x": TImageSrc;
};

export type TImage = {
  avif?: TPathsImage;
  webp?: TPathsImage;
  jpg: TPathsImage;
};
