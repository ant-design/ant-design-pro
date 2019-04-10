import React from 'react';

export interface EditableLinkGroupProps {
  links: any[];
  onAdd: () => void;
  linkElement: string;
}

export default class EditableLinkGroup extends React.Component<EditableLinkGroupProps, any> {}
