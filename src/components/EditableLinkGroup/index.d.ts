import React from 'react';

export interface IEditableLinkGroupProps {
  links: any[];
  onAdd: () => void;
  linkElement: string;
}

export default class EditableLinkGroup extends React.Component<IEditableLinkGroupProps, any> {}
