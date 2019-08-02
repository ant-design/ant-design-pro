import { Card, Form, Input, Select } from 'antd';
import React, { Fragment } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { withPropsAPI } from 'gg-editor';

const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

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

interface DetailFormProps extends FormComponentProps {
  type: string;
  propsAPI?: any;
}

class DetailForm extends React.Component<DetailFormProps> {
  get item() {
    const { propsAPI } = this.props;

    return propsAPI.getSelected()[0];
  }

  handleSubmit = (e: React.FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

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

  renderEdgeShapeSelect = () => (
    <Select onChange={this.handleSubmit}>
      <Option value="flow-smooth">Smooth</Option>
      <Option value="flow-polyline">Polyline</Option>
      <Option value="flow-polyline-round">Polyline Round</Option>
    </Select>
  );

  renderNodeDetail = () => {
    const { form } = this.props;
    const { label } = this.item.getModel();

    return (
      <Item label="Label" {...inlineFormItemLayout}>
        {form.getFieldDecorator('label', {
          initialValue: label,
        })(<Input onBlur={this.handleSubmit} />)}
      </Item>
    );
  };

  renderEdgeDetail = () => {
    const { form } = this.props;
    const { label = '', shape = 'flow-smooth' } = this.item.getModel();

    return (
      <Fragment>
        <Item label="Label" {...inlineFormItemLayout}>
          {form.getFieldDecorator('label', {
            initialValue: label,
          })(<Input onBlur={this.handleSubmit} />)}
        </Item>
        <Item label="Shape" {...inlineFormItemLayout}>
          {form.getFieldDecorator('shape', {
            initialValue: shape,
          })(this.renderEdgeShapeSelect())}
        </Item>
      </Fragment>
    );
  };

  renderGroupDetail = () => {
    const { form } = this.props;
    const { label = '新建分组' } = this.item.getModel();

    return (
      <Item label="Label" {...inlineFormItemLayout}>
        {form.getFieldDecorator('label', {
          initialValue: label,
        })(<Input onBlur={this.handleSubmit} />)}
      </Item>
    );
  };

  render() {
    const { type } = this.props;

    if (!this.item) {
      return null;
    }

    return (
      <Card type="inner" size="small" title={upperFirst(type)} bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          {type === 'node' && this.renderNodeDetail()}
          {type === 'edge' && this.renderEdgeDetail()}
          {type === 'group' && this.renderGroupDetail()}
        </Form>
      </Card>
    );
  }
}

export default Form.create<DetailFormProps>()(withPropsAPI(DetailForm as any));
