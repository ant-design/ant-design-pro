import React from "react";
export interface NumberInfoProps {
  title: React.ReactNode | string;
  subTitle: React.ReactNode | string;
  total: React.ReactNode | string;
  status: "up" | "down";
  theme: string;
  gap: number;
}

export default class NumberInfo extends React.Component<NumberInfoProps, any> {}
