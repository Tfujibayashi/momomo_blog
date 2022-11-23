import React from 'react';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Spacer } from './spacer';

type EditListItemBoxProps<T> = {
  item: T;
  title: string;
  isDeleted?: boolean;
  onClick?: (() => void) | ((item: T) => void);
  onClickEditIcon?: (() => void) | ((item: T) => void);
  onClickTrashIcon?: (() => void) | ((item: T) => void);
  onClickRecycleIcon?: (() => void) | ((item: T) => void);
};

export const EditListItemBox = <T,>({
  item,
  title,
  isDeleted = false,
  onClick,
  onClickEditIcon,
  onClickTrashIcon,
  onClickRecycleIcon,
}: EditListItemBoxProps<T>): JSX.Element => {
  const _onClickTrashIcon = (event: React.MouseEvent<SVGSVGElement, MouseEvent>, item: T): void => {
    event.stopPropagation();

    onClickTrashIcon && onClickTrashIcon(item);
  };

  const _onClickRecycleIcon = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    item: T,
  ): void => {
    event.stopPropagation();

    onClickRecycleIcon && onClickRecycleIcon(item);
  };

  return (
    <div>
      <a onClick={(): void => onClick && onClick(item)} style={style.wrapper}>
        <div>
          <h2 style={style.title}>{title}</h2>

          {isDeleted && <p style={style.delete}>deleted</p>}
        </div>

        <div style={style.icon}>
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={(): void => onClickEditIcon && onClickEditIcon(item)}
          />

          <Spacer direction="horizontal" />

          {isDeleted ? (
            <FontAwesomeIcon
              icon={faRecycle}
              onClick={(event): void => _onClickRecycleIcon(event, item)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={(event): void => _onClickTrashIcon(event, item)}
            />
          )}
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
  delete: {
    color: 'red',
  },
};
