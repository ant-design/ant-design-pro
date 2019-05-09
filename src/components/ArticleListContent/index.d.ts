import React from 'react';

export interface IApplicationsProps {
  data: {
    content?: string;
    updatedAt?: any;
    avatar?: string;
    owner?: string;
    href?: string;
  };
}

export default class ArticleListContent extends React.Component<IApplicationsProps, any> {}
