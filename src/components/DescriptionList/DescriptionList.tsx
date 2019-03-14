import { Row } from 'antd';
import classNames from 'classnames';
import React from 'react';
import Description, { DescriptionProps } from './Description';
import styles from './index.less';

export interface IDescriptionListProps {
  className?: string;
  col?: number;
  description?: DescriptionProps[];
  gutter?: number;
  layout?: 'horizontal' | 'vertical';
  size?: 'large' | 'small';
  style?: React.CSSProperties;
  title?: React.ReactNode;
}

export type IDescriptionListComponent = React.FC<IDescriptionListProps> & {
  Description: Description;
};

const DescriptionList: IDescriptionListComponent = ({
  className,
  title,
  col = 3,
  layout = 'horizontal',
  gutter = 32,
  children,
  size,
  ...restProps
}) => {
  const clsString = classNames(styles.descriptionList, styles[layout], className, {
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
  });
  const column = col > 4 ? 4 : col;
  return (
    <div className={clsString} {...restProps}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <Row gutter={gutter}>
        {React.Children.map(children, (child: React.ReactElement<Description>) =>
          child ? React.cloneElement(child, { column }) : child
        )}
      </Row>
    </div>
  );
};

DescriptionList.Description = Description;

export default DescriptionList;
