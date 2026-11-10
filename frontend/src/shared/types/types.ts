export type Tlink = string;
//  тип события при нажатии на иконку или кнопку с иконкой или просто кнопку
export type TEventType =
  | {
      trigger: "route";
      path: Tlink;
    }
  | {
      trigger: "action-on-page";
      callback: () => void;
    };

export type TActionUser = TEventType & {
  title: string;
};

export type TThemeElementsPage =
  | "primary"
  | "secondary"
  | "expressive-gray"
  | "color-accent";

//  для картинок

export type TImageSrc = string;

// возмнож сделать какую то из картинок необяз ?
export type TPathsImage = {
  "1x": TImageSrc;
  "2x"?: TImageSrc;
};

export type TImage = {
  avif?: TPathsImage;
  webp?: TPathsImage;
  jpg: TPathsImage;
};

//  описание картинки с подписью

export type TDescriptWithImage = {
  srcImage: TImage;
  descpImage: string;
};
//  если нужна сслыка для перехода

export type TDescriptWithImageLink = TDescriptWithImage & {
  link: Tlink;
};
