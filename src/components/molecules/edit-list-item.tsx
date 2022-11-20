type EditListItemBoxProps = {
  title: string;
  onClick?: () => void;
};

export const EditListItemBox = ({ title, onClick }: EditListItemBoxProps): JSX.Element => {
  return (
    <a onClick={onClick}>
      <h2>{title}</h2>
    </a>
  );
};
