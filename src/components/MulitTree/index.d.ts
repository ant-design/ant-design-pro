import * as React from 'react';
export interface IResultProps {
	data: React.ReactNode;
	onItemSelect: React.ReactNode;
	onRootGroupCreate: React.ReactNode;
	onGroupDelete: React.ReactNode;
	onChildGroupCreate: React.ReactNode;
}

export default class MulitTree extends React.Component<IResultProps, any> {}
