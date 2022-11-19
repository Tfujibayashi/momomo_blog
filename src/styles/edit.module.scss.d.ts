export type Styles = {
  edit: string;
  'edit--preview': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
