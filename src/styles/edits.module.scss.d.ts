export type Styles = {
  edits: string;
  edits__content: string;
  edits__list: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
