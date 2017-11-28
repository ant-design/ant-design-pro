import React from "react";
export interface FieldProps {
  label: string | React.ReactNode;
  value: string | React.ReactNode;
}

export default class Field extends React.Component<FieldProps, any> {}
