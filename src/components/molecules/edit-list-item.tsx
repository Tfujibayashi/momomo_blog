import React from 'react';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Spacer } from './spacer';

type EditListItemBoxProps = {
  title: string;
  onClick?: () => void;
  onClickEditIcon?: () => void;
  onClickTrashIcon?: () => void;
};

export const EditListItemBox = ({
  title,
  onClick,
  onClickEditIcon,
  onClickTrashIcon,
}: EditListItemBoxProps): JSX.Element => {
  const _onClickTrashIcon = (event: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    event.stopPropagation();

    onClickTrashIcon && onClickTrashIcon();
  };

  return (
    <div>
      <a onClick={onClick} style={style.wrapper}>
        <h2 style={style.title}>{title}</h2>

        <div style={style.icon}>
          <FontAwesomeIcon icon={faPencilAlt} onClick={onClickEditIcon} />

          <Spacer direction="horizontal" />

          <FontAwesomeIcon icon={faTrashAlt} onClick={_onClickTrashIcon} />
        </div>
      </a>
    </div>
  );
};

const style: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginBottom: 0,
  },
  icon: {
    display: 'flex',
  },
};
