import React from 'react';

import { faEye, faEyeSlash, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Spacer } from './spacer';

type EditListItemBoxProps<T> = {
  item: T;
  title: string;
  isPublic?: boolean;
  isDeleted?: boolean;
  onClick?: (() => void) | ((item: T) => void);
  onClickPublicIcon?: (() => void) | ((item: T) => void);
  onClickUnPublicIcon?: (() => void) | ((item: T) => void);
  onClickEditIcon?: (() => void) | ((item: T) => void);
  onClickTrashIcon?: (() => void) | ((item: T) => void);
  onClickRecycleIcon?: (() => void) | ((item: T) => void);
};

export const EditListItemBox = <T,>({
  item,
  title,
  isPublic = false,
  isDeleted = false,
  onClick,
  onClickPublicIcon,
  onClickUnPublicIcon,
  onClickEditIcon,
  onClickTrashIcon,
  onClickRecycleIcon,
}: EditListItemBoxProps<T>): JSX.Element => {
  const _onClickPublicIcon = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    item: T,
  ): void => {
    event.stopPropagation();

    onClickPublicIcon && onClickPublicIcon(item);
  };

  const _onClickUnPublicIcon = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    item: T,
  ): void => {
    event.stopPropagation();

    onClickUnPublicIcon && onClickUnPublicIcon(item);
  };

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
          {isPublic
            ? onClickUnPublicIcon && (
                <>
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    onClick={(event): void => _onClickUnPublicIcon(event, item)}
                  />
                  <Spacer direction="horizontal" />
                </>
              )
            : onClickPublicIcon && (
                <>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={(event): void => _onClickPublicIcon(event, item)}
                  />

                  <Spacer direction="horizontal" />
                </>
              )}

          {onClickEditIcon && (
            <>
              <FontAwesomeIcon icon={faPencilAlt} onClick={(): void => onClickEditIcon(item)} />

              <Spacer direction="horizontal" />
            </>
          )}

          {isDeleted
            ? onClickRecycleIcon && (
                <FontAwesomeIcon
                  icon={faRecycle}
                  onClick={(event): void => _onClickRecycleIcon(event, item)}
                />
              )
            : onClickRecycleIcon && (
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
