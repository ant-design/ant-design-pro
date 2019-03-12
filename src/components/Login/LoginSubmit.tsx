import { Button, Form } from 'antd';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

const FormItem = Form.Item;

interface LoginSubmitProps {
  className?: string;
}
const LoginSubmit: React.FunctionComponent<LoginSubmitProps> = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button size="large" className={clsString} type="primary" htmlType="submit" {...rest} />
    </FormItem>
  );
};

export default LoginSubmit;
