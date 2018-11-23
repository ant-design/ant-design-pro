import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Form, Input, Button } from 'antd';
import styles from './RichText.less';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const FormItem = Form.Item;

class FormDemo extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const { form } = this.props;
    form.validateFields((error, values) => {
      if (!error) {
        const submitData = {
          title: values.title,
          content: values.content.toRAW(), // or values.content.toHTML()
        };
        // eslint-disable-next-line no-console
        console.log(submitData);
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const controls = [
      'bold',
      'italic',
      'underline',
      'text-color',
      'separator',
      'link',
      'separator',
      'media',
    ];

    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="文章标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入标题',
                },
              ],
            })(<Input size="large" placeholder="请输入标题" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="文章正文">
            {getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              initialValue: BraftEditor.createEditorState('<p>Hello <b>ANT DESIGN PRO!</b></p>'),
              rules: [
                {
                  required: true,
                  validator: (_, value, callback) => {
                    if (value.isEmpty()) {
                      callback('请输入正文内容');
                    } else {
                      callback();
                    }
                  },
                },
              ],
            })(
              <BraftEditor
                className={styles.editor}
                controls={controls}
                placeholder="请输入正文内容"
              />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button size="large" type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(FormDemo);
