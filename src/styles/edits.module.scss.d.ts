export type Styles = {
  edits: string;
  'edits--content': string;
  'edits--list': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
