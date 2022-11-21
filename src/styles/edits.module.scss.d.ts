export type Styles = {
  edits: string;
  'edits--list': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
