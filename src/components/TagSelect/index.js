import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tag, Icon } from 'antd';

import styles from './index.less';

const { CheckableTag } = Tag;

const TagSelectOption = ({ children, checked, onChange, value }) => (
  <CheckableTag checked={checked} key={value} onChange={state => onChange(value, state)}>
    {children}
  </CheckableTag>
);

const emptyValue = isSingleSelect => (isSingleSelect ? '' : []);

TagSelectOption.isTagSelectOption = true;

class TagSelect extends Component {
  static propTypes = {
    actionsText: PropTypes.object,
    hideCheckAll: PropTypes.bool,
    isSingleSelect: PropTypes.bool,
  };

  static defaultProps = {
    hideCheckAll: false, // 单选情况下不显示
    isSingleSelect: false, // 是否单选
    actionsText: {
      expandText: 'Expand',
      collapseText: 'Collapse',
      selectAllText: 'All',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      value: props.value || props.defaultValue || emptyValue(props.isSingleSelect),
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return { value: nextProps.value || emptyValue(nextProps.isSingleSelect) };
    }
    return null;
  }

  onChange = value => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (onChange) {
      onChange(value);
    }
  };

  onSelectAll = checked => {
    let checkedTags = [];
    if (checked) {
      checkedTags = this.getAllTags();
    }
    this.onChange(checkedTags);
  };

  getAllTags() {
    let { children } = this.props;
    children = React.Children.toArray(children);
    const checkedTags = children
      .filter(child => this.isTagSelectOption(child))
      .map(child => child.props.value);
    return checkedTags || [];
  }

  handleTagChange = (value, checked) => {
    const { isSingleSelect } = this.props;
    const { value: StateValue } = this.state;
    let checkedTags = value;
    if (!isSingleSelect) {
      checkedTags = [...StateValue];
      const isInclude = checkedTags.includes(value);
      if (checked && !isInclude) {
        checkedTags.push(value);
      } else if (!checked && isInclude) {
        checkedTags.splice(checkedTags.findIndex(v => v === value), 1);
      }
    }

    this.onChange(checkedTags);
  };

  handleExpand = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  };

  isTagSelectOption = node =>
    node &&
    node.type &&
    (node.type.isTagSelectOption || node.type.displayName === 'TagSelectOption');

  render() {
    const { value, expand } = this.state;
    const {
      children,
      hideCheckAll,
      className,
      style,
      expandable,
      actionsText,
      isSingleSelect,
    } = this.props;
    const checkedAll = this.getAllTags().length === value.length;
    const { expandText = 'Expand', collapseText = 'Collapse', selectAllText = 'All' } =
      actionsText === null ? {} : actionsText;

    const cls = classNames(styles.tagSelect, className, {
      [styles.hasExpandTag]: expandable,
      [styles.expanded]: expandable ? expand : true,
    });

    return (
      <div className={cls} style={style}>
        {hideCheckAll || isSingleSelect ? null : (
          <CheckableTag checked={checkedAll} key="tag-select-__all__" onChange={this.onSelectAll}>
            {selectAllText}
          </CheckableTag>
        )}
        {value !== undefined &&
          React.Children.map(children, child => {
            const {
              props: { value: childValue },
            } = child;
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${childValue}`,
                value: childValue,
                checked: isSingleSelect ? value === childValue : value.includes(childValue),
                onChange: this.handleTagChange,
              });
            }
            return child;
          })}
        {expandable && (
          <a className={styles.trigger} onClick={this.handleExpand}>
            {expand ? collapseText : expandText} <Icon type={expand ? 'up' : 'down'} />
          </a>
        )}
      </div>
    );
  }
}

TagSelect.Option = TagSelectOption;

export default TagSelect;
