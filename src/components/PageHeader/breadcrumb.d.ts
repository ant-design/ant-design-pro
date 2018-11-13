import * as React from 'react';
import { IPageHeaderProps } from './index';

export default class BreadcrumbView extends React.Component<IPageHeaderProps, any> {}

export function getBreadcrumb(breadcrumbNameMap: object, url: string): object;
