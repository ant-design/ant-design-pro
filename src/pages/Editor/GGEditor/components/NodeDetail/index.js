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

class NodeDetail extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      const item = getSelected()[0];

      if (!item) {
        return;
      }

      executeCommand(() => {
        update(item, {
          ...values,
        });
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

    const { label } = item.getModel();

    return (
      <Card type="inner" title="Node" bordered={false}>
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

export default Form.create()(withPropsAPI(NodeDetail));
