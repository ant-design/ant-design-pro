import React, { Component } from 'react';
import classNames from 'classnames';
import { Tag, Icon } from 'antd';

import styles from './index.less';

const { CheckableTag } = Tag;

const TagSelectOption = ({ children, checked, onChange, value }) => (
  <CheckableTag
    checked={checked}
    key={value}
    onChange={state => onChange(value, state)}
  >
    {children}
  </CheckableTag>
);

TagSelectOption.isTagSelectOption = true;

class TagSelect extends Component {
  state = {
    expand: false,
    checkedTags: this.props.defaultValue || [],
  };

  onSelectAll = (checked) => {
    const { onChange } = this.props;
    let checkedTags = [];
    if (checked) {
      checkedTags = this.getAllTags();
    }

    this.setState({ checkedTags });

    if (onChange) {
      onChange(checkedTags);
    }
  }

  getAllTags() {
    const { children } = this.props;
    const checkedTags = children
      .filter(child => this.isTagSelectOption(child))
      .map(child => child.props.value);
    return checkedTags;
  }

  handleTagChange = (value, checked) => {
    const { onChange } = this.props;
    const { checkedTags } = this.state;

    const index = checkedTags.indexOf(value);
    if (checked && index === -1) {
      checkedTags.push(value);
    } else if (!checked && index > -1) {
      checkedTags.splice(index, 1);
    }

    this.setState({ checkedTags });

    if (onChange) {
      onChange(checkedTags);
    }
  }

  handleExpand = () => {
    this.setState({
      expand: !this.state.expand,
    });
  }

  isTagSelectOption = (node) => {
    return node && node.type && (
      node.type.isTagSelectOption || node.type.displayName === 'TagSelectOption'
    );
  }

  render() {
    const { checkedTags, expand } = this.state;
    const { children, className, style, expandable } = this.props;

    const checkedAll = this.getAllTags().length === checkedTags.length;

    const cls = classNames(styles.tagSelect, className, {
      [styles.hasExpandTag]: expandable,
      [styles.expanded]: expand,
    });

    return (
      <div className={cls} style={style}>
        <CheckableTag
          checked={checkedAll}
          key="tag-select-__all__"
          onChange={this.onSelectAll}
        >
          全部
        </CheckableTag>
        {
          checkedTags && children
            .map((child) => {
              if (this.isTagSelectOption(child)) {
                return React.cloneElement(child, {
                  key: `tag-select-${child.props.value}`,
                  checked: checkedTags.indexOf(child.props.value) > -1,
                  onChange: this.handleTagChange,
                });
              }
              return child;
            })
        }
        {
          expandable && (
            <a className={styles.trigger} onClick={this.handleExpand}>
              {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
            </a>
          )
        }
      </div>
    );
  }
}

TagSelect.Option = TagSelectOption;

export default TagSelect;
