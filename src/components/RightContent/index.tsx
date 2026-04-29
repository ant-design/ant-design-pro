import { QuestionCircleOutlined } from '@ant-design/icons';
import { history, SelectLang as UmiSelectLang } from '@umijs/max';

export type SiderTheme = 'light' | 'dark';

export const SelectLang: React.FC = () => {
  return <UmiSelectLang />;
};

export const Question: React.FC = () => {
  return (
    <span
      onClick={() => {
        history.push('/welcome');
      }}
    >
      <QuestionCircleOutlined />
    </span>
  );
};
