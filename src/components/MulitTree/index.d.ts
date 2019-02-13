import * as React from 'react';
export interface IResultProps {
	data: React.ReactNode;
	itemSelectHandlers: React.ReactNode;
	rootGroupCreateHandler: React.ReactNode;
}

export default class MulitTree extends React.Component<IResultProps, any> {}
