import React, { useRef } from 'react';

import { faEye, faEyeSlash, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faCamera, faPencilAlt, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Spacer } from './spacer';

type EditListItemBoxProps<T> = {
  item: T;
  title: string;
  imagePath?: string;
  isPublic?: boolean;
  isDeleted?: boolean;
  onClick?: (() => void) | ((item: T) => void);
  onClickCameraIcon?: ((file: File) => void) | ((file: File, item: T) => void);
  onClickPublicIcon?: (() => void) | ((item: T) => void);
  onClickUnPublicIcon?: (() => void) | ((item: T) => void);
  onClickEditIcon?: (() => void) | ((item: T) => void);
  onClickTrashIcon?: (() => void) | ((item: T) => void);
  onClickRecycleIcon?: (() => void) | ((item: T) => void);
};

export const EditListItemBox = <T,>({
  item,
  title,
  imagePath,
  isPublic = false,
  isDeleted = false,
  onClick,
  onClickCameraIcon,
  onClickPublicIcon,
  onClickUnPublicIcon,
  onClickEditIcon,
  onClickTrashIcon,
  onClickRecycleIcon,
}: EditListItemBoxProps<T>): JSX.Element => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleClickCameraIcon = (event: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    event.stopPropagation();

    inputFileRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, item: T): void => {
    event.stopPropagation();

    if (event.target.files) {
      const image = event.target.files[0];

      onClickCameraIcon && onClickCameraIcon(image, item);
    }
  };

  const handleClickPublicIcon = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    item: T,
  ): void => {
    event.stopPropagation();

    onClickPublicIcon && onClickPublicIcon(item);
  };

  const handleClickUnPublicIcon = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    item: T,
  ): void => {
    event.stopPropagation();

    onClickUnPublicIcon && onClickUnPublicIcon(item);
  };

  const handleClickTrashIcon = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    item: T,
  ): void => {
    event.stopPropagation();

    onClickTrashIcon && onClickTrashIcon(item);
  };

  const handleClickRecycleIcon = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    item: T,
  ): void => {
    event.stopPropagation();

    onClickRecycleIcon && onClickRecycleIcon(item);
  };

  const handleClickInput = (event: React.MouseEvent<HTMLInputElement>): void => {
    event.stopPropagation();
  };

  return (
    <div>
      <a onClick={(): void => onClick && onClick(item)} style={style.wrapper}>
        <div style={style.header}>
          <div>
            <h2 style={style.title}>{title}</h2>

            {isDeleted && <p style={style.delete}>deleted</p>}
          </div>

          <div style={style.icon}>
            {onClickCameraIcon && (
              <>
                <FontAwesomeIcon icon={faCamera} onClick={handleClickCameraIcon} />

                <input
                  type="file"
                  ref={inputFileRef}
                  onClick={handleClickInput}
                  onChange={(event): void => handleImageChange(event, item)}
                  style={{ display: 'none' }}
                />

                <Spacer direction="horizontal" />
              </>
            )}

            {isPublic
              ? onClickUnPublicIcon && (
                  <>
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      onClick={(event): void => handleClickUnPublicIcon(event, item)}
                    />

                    <Spacer direction="horizontal" />
                  </>
                )
              : onClickPublicIcon && (
                  <>
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={(event): void => handleClickPublicIcon(event, item)}
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
                    onClick={(event): void => handleClickRecycleIcon(event, item)}
                  />
                )
              : onClickRecycleIcon && (
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={(event): void => handleClickTrashIcon(event, item)}
                  />
                )}
          </div>
        </div>

        {imagePath && <img src={imagePath} />}
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
    display: 'block',
  },
  header: {
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
