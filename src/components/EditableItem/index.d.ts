import React from 'react';

export interface EditableItemProps {
  onChange?: (value?: string | string[] | number) => void;
}

export default class EditableItem extends React.Component<EditableItemProps, any> {}
