// Release a new version of the dedicated popup

import React from 'react';
import { Modal } from 'antd';
import { formatMessage } from 'umi/locale';

const key = 'antd-pro@2.0.0-notification-sent';

const infoNewVersion = () => {
  Modal.info({
    title: formatMessage({ id: 'app.publish.title' }),
    content: (
      <div>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt="Ant Design"
        />
        <p>
          {formatMessage({ id: 'app.publish.greeting' })}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={formatMessage({ id: 'app.publish.url' })}
          >
            Ant Desgin Pro {formatMessage({ id: 'app.publish.intro' })}
          </a>
          {formatMessage({ id: 'app.publish.tips' })}
          {formatMessage({ id: 'app.publish.old-version-guide' })}
          <a target="_blank" rel="noopener noreferrer" href="https://v1.pro.ant.design">
            v1.pro.ant.design
          </a>
        </p>
      </div>
    ),
    okText: 'OK',
    onOk: () => localStorage.setItem(key, 'true'),
    className: 'new-version-info-modal',
    width: 470,
  });
};

requestAnimationFrame(() => {
  if (localStorage.getItem(key) !== 'true' && Date.now() < new Date('2018/9/5').getTime()) {
    infoNewVersion();
  }
});
