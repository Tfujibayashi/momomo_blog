type ButtonProps = {
  label: string;
  onClick?: () => void;
};

export const Button = ({ label, onClick }: ButtonProps): JSX.Element => {
  return (
    <div>
      <button type="button" className="nes-btn is-primary" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};
