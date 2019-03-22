import React from 'react';
import { PageHeaderProps } from './index';

export default class BreadcrumbView extends React.Component<PageHeaderProps, any> {}

export function getBreadcrumb(breadcrumbNameMap: object, url: string): object;
