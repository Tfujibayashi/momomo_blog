type ContentBoxProps = {
  title: string;
  imageUri: string;
  onClick?: () => void;
};

export const ContentBox = ({ title, imageUri, onClick }: ContentBoxProps): JSX.Element => {
  return (
    <a onClick={onClick}>
      <img src={imageUri} />

      <h2>{title}</h2>
    </a>
  );
};
