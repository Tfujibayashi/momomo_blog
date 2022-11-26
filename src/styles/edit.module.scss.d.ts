export type Styles = {
  edit: string;
  'edit--form': string;
  'edit--form--preview': string;
  'edit--title': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
