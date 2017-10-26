import React, { PureComponent } from 'react';
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
TagSelectOption.defaultProps = {
  displayName: 'TagSelectOption',
};

class TagSelect extends PureComponent {
  static defaultProps = {
    initialValue: [],
  };

  state = {
    checkedAll: false,
    expand: false,
    checkedTags: this.props.initialValue || [],
  };

  onSelectAll = (checked) => {
    const { onChange } = this.props;
    let checkedTags = [];
    if (checked) {
      checkedTags = this.getAllTags();
    }

    this.setState({
      checkedAll: checked,
      checkedTags,
    });

    if (onChange) {
      onChange(checkedTags);
    }
  }

  getAllTags() {
    const { children } = this.props;
    const checkedTags = children
      .filter(child => child.props.displayName === 'TagSelectOption')
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

    const tags = this.getAllTags();

    this.setState({
      checkedAll: tags.length === checkedTags.length,
      checkedTags,
    });

    if (onChange) {
      onChange(checkedTags);
    }
  }

  handleExpand = () => {
    this.setState({
      expand: !this.state.expand,
    });
  }

  render() {
    const { checkedTags, checkedAll, expand } = this.state;
    const { children, className, style, expandable } = this.props;

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
          children.filter(child => child.props.displayName === 'TagSelectOption').map(child => React.cloneElement(child, {
            key: `tag-select-${child.props.value}`,
            checked: checkedTags.indexOf(child.props.value) > -1,
            onChange: this.handleTagChange,
          }))
        }
        {
          expandable && (
            <a className={styles.trigger} onClick={this.handleExpand}>
              { expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
            </a>
          )
        }
      </div>
    );
  }
}

TagSelect.Option = TagSelectOption;

export default TagSelect;
