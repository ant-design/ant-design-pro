import * as React from 'react';
export interface IResultProps {
	data: React.ReactNode;
	onItemSelect: React.ReactNode;
	onGroupCreate: React.ReactNode;
	onGroupDelete: React.ReactNode;
}

export default class MulitTree extends React.Component<IResultProps, any> {}
