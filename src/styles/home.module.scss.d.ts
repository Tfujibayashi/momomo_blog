export type Styles = {
  home: string;
  'home--content': string;
  'home--content--item': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
