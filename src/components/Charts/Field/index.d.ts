import * as React from "react";
export interface IFieldProps {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
}

export default class Field extends React.Component<IFieldProps, any> {}
