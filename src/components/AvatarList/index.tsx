import React from 'react';
import { Tooltip, Avatar } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

export declare type SizeType = number | 'small' | 'default' | 'large' | undefined;

const avatarSizeToClassName: (size: SizeType) => string = size =>
  classNames(styles.avatarItem, {
    [styles.avatarItemLarge]: size === 'large',
    [styles.avatarItemSmall]: size === 'small',
    [styles.avatarItemMini]: size === 'mini',
  });

interface AvatarItemProps {
  tips: React.ReactNode;
  src: string;
  size?: SizeType;
  style?: React.CSSProperties;
  onClick?: () => void;
}

interface AvatarListProps {
  Item?: React.ReactElement<AvatarItemProps>;
  size?: SizeType;
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactElement<AvatarItemProps> | Array<React.ReactElement<AvatarItemProps>>;
}

export const AvatarList: React.FC<AvatarListProps> = ({
  children,
  size,
  maxLength,
  excessItemsStyle,
  ...other
}) => {
  const numOfChildren = React.Children.count(children);
  const numToShow = maxLength >= numOfChildren ? numOfChildren : maxLength;

  const childrenWithProps = React.Children.toArray(children)
    .slice(0, numToShow)
    .map((child: React.ReactElement<AvatarItemProps>) =>
      React.cloneElement(child, {
        size,
      })
    );

  if (numToShow < numOfChildren) {
    const cls = avatarSizeToClassName(size);

    childrenWithProps.push(
      <li key="exceed" className={cls}>
        <Avatar size={size} style={excessItemsStyle}>{`+${numOfChildren - maxLength}`}</Avatar>
      </li>
    );
  }

  return (
    <div {...other} className={styles.avatarList}>
      <ul> {childrenWithProps} </ul>
    </div>
  );
};

export const AvatarListItem: React.FC<AvatarItemProps> = ({
  src,
  size,
  tips,
  onClick = () => {},
}) => {
  const cls = avatarSizeToClassName(size);

  return (
    <li className={cls} onClick={onClick}>
      {tips ? (
        <Tooltip title={tips}>
          <Avatar src={src} size={size} style={{ cursor: 'pointer' }} />
        </Tooltip>
      ) : (
        <Avatar src={src} size={size} />
      )}
    </li>
  );
};
