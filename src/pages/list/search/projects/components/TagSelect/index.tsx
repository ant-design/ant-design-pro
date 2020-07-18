import React, { Component } from 'react';
import { Tag } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

import classNames from 'classnames';
import styles from './index.less';

const { CheckableTag } = Tag;

export interface TagSelectOptionProps {
  value?: string | number;
  style?: React.CSSProperties;
  checked?: boolean;
  onChange?: (value: string | number | undefined, state: boolean) => void;
}

export interface TagSelectProps {
  onChange?: (value: (string | number)[]) => void;
  expandable?: boolean;
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  style?: React.CSSProperties;
  hideCheckAll?: boolean;
  actionsText?: {
    expandText?: React.ReactNode;
    collapseText?: React.ReactNode;
    selectAllText?: React.ReactNode;
  };
  className?: string;
  Option?: TagSelectOptionProps;
  children?: React.ReactElement<TagSelectOptionType> | React.ReactElement<TagSelectOptionType>[];
}

const TagSelectOption: React.FC<TagSelectOptionProps> & {
  isTagSelectOption: boolean;
} = ({ children, checked, onChange, value }) => (
  <CheckableTag
    checked={!!checked}
    key={value}
    onChange={(state) => onChange && onChange(value, state)}
  >
    {children}
  </CheckableTag>
);

TagSelectOption.isTagSelectOption = true;

type TagSelectOptionType = typeof TagSelectOption;

interface TagSelectState {
  expand: boolean;
  value: (string | number)[];
}

class TagSelect extends Component<TagSelectProps, TagSelectState> {
  static defaultProps = {
    hideCheckAll: false,
    actionsText: {
      expandText: '展开',
      collapseText: '收起',
      selectAllText: '全部',
    },
  };

  static Option: TagSelectOptionType = TagSelectOption;

  static getDerivedStateFromProps(nextProps: TagSelectProps) {
    if ('value' in nextProps) {
      return { value: nextProps.value || [] };
    }
    return null;
  }

  constructor(props: TagSelectProps) {
    super(props);
    this.state = {
      expand: false,
      value: props.value || props.defaultValue || [],
    };
  }

  onChange = (value: (string | number)[]) => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (onChange) {
      onChange(value);
    }
  };

  onSelectAll = (checked: boolean) => {
    let checkedTags: (string | number)[] = [];
    if (checked) {
      checkedTags = this.getAllTags();
    }
    this.onChange(checkedTags);
  };

  getAllTags() {
    const { children } = this.props;
    const childrenArray = React.Children.toArray(children) as any[];
    const checkedTags = childrenArray
      .filter((child) => this.isTagSelectOption(child))
      .map((child) => child.props.value);
    return checkedTags || [];
  }

  handleTagChange = (value: string | number, checked: boolean) => {
    const { value: StateValue } = this.state;
    const checkedTags: (string | number)[] = [...StateValue];

    const index = checkedTags.indexOf(value);
    if (checked && index === -1) {
      checkedTags.push(value);
    } else if (!checked && index > -1) {
      checkedTags.splice(index, 1);
    }
    this.onChange(checkedTags);
  };

  handleExpand = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  };

  isTagSelectOption = (node: React.ReactElement<TagSelectOptionType, TagSelectOptionType>) =>
    node &&
    node.type &&
    (node.type.isTagSelectOption || node.type.displayName === 'TagSelectOption');

  render() {
    const { value, expand } = this.state;
    const { children, hideCheckAll, className, style, expandable, actionsText = {} } = this.props;
    const checkedAll = this.getAllTags().length === value.length;
    const { expandText = '展开', collapseText = '收起', selectAllText = '全部' } = actionsText;

    const cls = classNames(styles.tagSelect, className, {
      [styles.hasExpandTag]: expandable,
      [styles.expanded]: expand,
    });

    return (
      <div className={cls} style={style}>
        {hideCheckAll ? null : (
          <CheckableTag checked={checkedAll} key="tag-select-__all__" onChange={this.onSelectAll}>
            {selectAllText}
          </CheckableTag>
        )}
        {value &&
          children &&
          React.Children.map(children, (child: any) => {
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${child.props.value}`,
                value: child.props.value,
                checked: value.indexOf(child.props.value) > -1,
                onChange: this.handleTagChange,
              });
            }
            return child;
          })}
        {expandable && (
          <a className={styles.trigger} onClick={this.handleExpand}>
            {expand ? (
              <>
                {collapseText} <UpOutlined />
              </>
            ) : (
              <>
                {expandText}
                <DownOutlined />
              </>
            )}
          </a>
        )}
      </div>
    );
  }
}

export default TagSelect;
