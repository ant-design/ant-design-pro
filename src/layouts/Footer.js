import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Portal',
          title: 'Portal',
          href: 'http://10.19.18.49:8010',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/fzodc/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Api Configuration',
          title: 'Api Configuration',
          href: 'http://10.19.18.49:8000',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 亚信远航
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
