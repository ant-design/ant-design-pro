import React from 'react';

export interface IEditableItemProps {
  onChange?: (value?: string | string[] | number) => void;
}

export default class EditableItem extends React.Component<IEditableItemProps, any> {}
