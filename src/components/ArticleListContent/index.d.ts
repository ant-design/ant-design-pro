import React from 'react';

export interface ApplicationsProps {
  data: {
    content?: string;
    updatedAt?: any;
    avatar?: string;
    owner?: string;
    href?: string;
  };
}

export default class ArticleListContent extends React.Component<ApplicationsProps, any> {}
