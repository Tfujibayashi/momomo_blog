export type Styles = {
  header: string;
  header__inner: string;
  header__title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
