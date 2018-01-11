import * as React from "react";
export interface FieldProps {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
}

export default class Field extends React.Component<FieldProps, any> {}
