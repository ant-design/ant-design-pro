import * as React from "react";
export interface FieldProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

export default class Field extends React.Component<FieldProps, any> {}
