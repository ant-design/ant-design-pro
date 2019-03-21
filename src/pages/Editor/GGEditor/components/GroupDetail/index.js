import React from 'react';
import { Card, Form, Input } from 'antd';
import { withPropsAPI } from 'gg-editor';

const { Item } = Form;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

class GroupDetail extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { form, propsAPI } = this.props;
    const { getSelected, update } = propsAPI;

    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      const item = getSelected()[0];

      if (!item) {
        return;
      }

      update(item, {
        ...values,
      });
    });
  };

  render() {
    const { form, propsAPI } = this.props;
    const { getFieldDecorator } = form;
    const { getSelected } = propsAPI;

    const item = getSelected()[0];

    if (!item) {
      return null;
    }

    const { label = '新建分组' } = item.getModel();

    return (
      <Card type="inner" title="Group" bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <Item label="Label" {...inlineFormItemLayout}>
            {getFieldDecorator('label', {
              initialValue: label,
            })(<Input onBlur={this.handleSubmit} />)}
          </Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(withPropsAPI(GroupDetail));
