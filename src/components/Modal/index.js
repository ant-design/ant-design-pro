import React, { Component } from 'react';
import { Modal, Spin } from 'antd';
import classNames from 'classnames';
import style from './index.less';

export default class CustModal extends Component {
  constructor(props) {
    super(props);
    this.timer = undefined;
    this.state = {
      modalProps: props,
    };
  }

  defClose = () => {
    const { modalProps } = this.state;
    const { onVisibleChange } = this.props;
    this.setState({
      modalProps: {
        ...modalProps,
        loading: false,
        visible: false,
        confirmLoading: false,
      },
    });
    if (onVisibleChange) {
      onVisibleChange(false);
    }
    // 动画结束后清理，直接清理会可见闪烁
    this.timer = setTimeout(() => {
      this.clearTimer();
      this.setState({
        modalProps: {},
      });
    }, 500);
  };

  defOk = onOk => {
    return () => {
      if (onOk == null) {
        this.defClose();
        return;
      }
      this.setState(
        ({ modalProps }) => ({
          modalProps: {
            ...modalProps,
            confirmLoading: true,
          },
        }),
        () => {
          const okResult = onOk({
            close: this.defClose,
          });
          (okResult instanceof Promise ? okResult : Promise.resolve(okResult)).then(result => {
            const { modalProps } = this.state;
            setTimeout(() => {
              this.setState({
                modalProps: {
                  ...modalProps,
                  confirmLoading: false,
                },
              });
            }, 0);
            if (result === false) {
              return;
            }
            if (result === undefined) {
              this.defClose();
            }
          });
        }
      );
    };
  };

  clearTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.timer = null;
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { modalProps } = this.state;
    const { children: nextChildren, visible } = nextProps;
    if (visible) {
      this.clearTimer();
    }
    // 如果children不传，使用原来的，for loading
    const { children: oChildren } = modalProps;
    let children = oChildren;
    if (nextChildren != null) {
      children = nextChildren;
    }
    this.setState({
      modalProps: {
        ...modalProps,
        ...nextProps,
        children,
      },
    });
  }

  render() {
    const { modalProps } = this.state;
    const {
      children,
      onOk,
      onCancel,
      loading,
      footer,
      // centered = true,
      centered,
      confirmLoading,
      wrapClassName,
      ...rest
    } = modalProps;
    // 各自只能出现一次
    let hasOk = false;
    let hasCancel = false;
    const okFn = this.defOk(onOk);
    const props = {
      destroyOnClose: true,
      ...rest,
      confirmLoading,
      onCancel: onCancel || this.defClose,
      onOk: okFn,
      footer: React.Children.map(footer, child => {
        if (child) {
          const { link, children: ch, ...restProps } = child.props;
          if (link) {
            // link 后 也携带事件？
            // const onClick = restProps.onClick;
            switch (link) {
              case 'ok':
                if (!hasOk) {
                  hasOk = true;
                  return React.cloneElement(child, {
                    type: modalProps.okType,
                    ...restProps,
                    ...modalProps.okButtonProps,
                    loading: confirmLoading,
                    children: ch || modalProps.okText || '确定',
                    onClick: okFn,
                  });
                }
                break;
              case 'cancel':
                if (!hasCancel) {
                  hasCancel = true;
                  return React.cloneElement(child, {
                    ...restProps,
                    ...modalProps.cancelButtonProps,
                    children: ch || modalProps.cancelText || '取消',
                    onClick: onCancel || this.defClose,
                  });
                }
                break;
              default:
            }
          }
        }
        return child;
      }),
    };
    return (
      <Modal
        wrapClassName={classNames(
          {
            [style.verticalCenter]: centered,
            'vertical-center-modal': centered,
          },
          wrapClassName
        )}
        {...props}
      >
        {loading ? <Spin>{children}</Spin> : children}
      </Modal>
    );
  }
}
