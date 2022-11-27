export type Styles = {
  home: string;
  home__content: string;
  home__content__item: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
