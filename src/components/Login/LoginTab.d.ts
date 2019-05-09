import React from 'react';

export interface ILoginTabProps {
  key?: string;
  tab?: React.ReactNode;
  tabUtil: {
    addTab: (id: any) => void;
    removeTab: (id: any) => void;
  };
}
export default class LoginTab extends React.Component<ILoginTabProps, any> {}
