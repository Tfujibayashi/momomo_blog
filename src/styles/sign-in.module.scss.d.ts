export type Styles = {
  'sign-in-form': string;
  'sign-in-password': string;
  'sign-in-username': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
