import React from "react";
export interface TagCloudProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  height: number;
}

export default class TagCloud extends React.Component<TagCloudProps, any> {}
