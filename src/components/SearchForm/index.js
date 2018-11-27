import React, { PureComponent } from 'react';
import router from 'umi/router';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Modal } from 'antd';
import styles from './index.less';

const FormItem = Form.Item;

@Form.create()
class SearchForm extends PureComponent {
  state = {
    inputval: '',
  };

  addPage = () => {
    const { linkUrl } = this.props;
    router.push(linkUrl);
  };

  changeValue = e => {
    this.setState({
      inputval: e.target.value,
    });
  };

  // 搜索向父组件（moviepage）传递数据
  handleSearch = e => {
    const { handleSearch } = this.props;
    const { inputval } = this.state;
    if (handleSearch) {
      handleSearch(e, inputval);
    }
  };

  // 删除 调用父组件（moviepage）的方法
  removeFilmItem = () => {
    const { removeFilmItem } = this.props;
    Modal.confirm({
      title: '你想删除这些条目吗?',
      content: '',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        removeFilmItem();
      },
      onCancel() {},
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div className={styles.tableList}>
        <div className={styles.tableListForm}>
          <Form onSubmit={this.handleSearch} layout="inline" className={styles.searName}>
            <Row gutter={{ sm: 24, md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={16} xs={16}>
                <FormItem>
                  {getFieldDecorator('name')(
                    <Input placeholder="请输入标题关键字" onChange={this.changeValue} />
                  )}
                </FormItem>
              </Col>
              <Col md={8} sm={6} xs={6}>
                <span className={styles.submitButtons}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                </span>
              </Col>
              <Col md={8} sm={2} xs={24}>
                <Button className={styles.fl} icon="plus" type="primary" onClick={this.addPage}>
                  添加
                </Button>
              </Col>
              {/* 批量删除注释
              <Col md={2} sm={24} className={styles.fl}>
              */}
              {/*
                <Button icon="del" type="primary" onClick={this.removeFilmItem}>
                */}
              {/*
                  批量删除*
                  /}
                {/*
                </Button>
                */}
              {/*
              </Col>
              */}
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

SearchForm.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
export default SearchForm;
