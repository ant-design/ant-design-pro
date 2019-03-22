import React from 'react';

export interface LoginTabProps {
  key?: string;
  tab?: React.ReactNode;
  tabUtil: {
    addTab: (id: any) => void;
    removeTab: (id: any) => void;
  };
}
export default class LoginTab extends React.Component<LoginTabProps, any> {}
