import { QuestionCircleOutlined } from '@ant-design/icons';
import { history, SelectLang as UmiSelectLang } from '@umijs/max';
import { createStyles } from 'antd-style';

export type SiderTheme = 'light' | 'dark';

const useStyles = createStyles(({ token }) => ({
  action: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    padding: '0 8px',
    cursor: 'pointer',
    borderRadius: token.borderRadius,
    transition: 'background-color 0.3s, color 0.3s',
    color: token.colorTextSecondary,
    fontSize: 16,
    '&:hover': {
      backgroundColor: token.colorBgTextHover,
      color: token.colorText,
    },
  },
}));

export const SelectLang: React.FC = () => {
  const { styles } = useStyles();
  return <UmiSelectLang className={styles.action} />;
};

export const Question: React.FC = () => {
  const { styles } = useStyles();
  return (
    <span
      className={styles.action}
      onClick={() => {
        history.push('/welcome');
      }}
    >
      <QuestionCircleOutlined />
    </span>
  );
};
