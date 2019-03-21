import React from 'react';
import { Card, Form, Input, Select } from 'antd';
import { withPropsAPI } from 'gg-editor';

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

class EdgeDetail extends React.Component {
  handleSubmit = () => {
    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    setTimeout(() => {
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
    }, 0);
  };

  renderShapeSelect() {
    return (
      <Select onChange={this.handleSubmit}>
        <Option value="flow-smooth">图曲线</Option>
        <Option value="flow-polyline">图折线</Option>
        <Option value="flow-polyline-round">圆角折线</Option>
      </Select>
    );
  }

  render() {
    const { form, propsAPI } = this.props;
    const { getFieldDecorator } = form;
    const { getSelected } = propsAPI;

    const item = getSelected()[0];

    if (!item) {
      return null;
    }

    const { label = '', shape = 'flow-smooth' } = item.getModel();

    return (
      <Card type="inner" title="边线属性" bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <Item label="Label" {...inlineFormItemLayout}>
            {getFieldDecorator('label', {
              initialValue: label,
            })(<Input onBlur={this.handleSubmit} />)}
          </Item>
          <Item label="图形" {...inlineFormItemLayout}>
            {getFieldDecorator('shape', {
              initialValue: shape,
            })(this.renderShapeSelect())}
          </Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(withPropsAPI(EdgeDetail));
