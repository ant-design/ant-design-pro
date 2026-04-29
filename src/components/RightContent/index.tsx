import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
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
    transition: 'all 0.2s',
    color: 'inherit',
    fontSize: 16,
    '&:hover': {
      backgroundColor: token.colorBgTextHover,
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
    <a
      href="https://pro.ant.design/docs/getting-started"
      target="_blank"
      rel="noreferrer"
      className={styles.action}
    >
      <QuestionCircleOutlined />
    </a>
  );
};
