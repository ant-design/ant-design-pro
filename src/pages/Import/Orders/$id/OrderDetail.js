import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './OrderDetail.less';
import moment from 'moment';

const { Description } = DescriptionList;


@connect(({ importOrder, loading }) => ({
  order: importOrder,
  loading: loading.global,
}))
class OrderDetail extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'importOrder/detail',
      payload:params.id ,
    });
  }

  render() {
    const { order = {}, loading } = this.props;
    // console.log(loading)
    const { productIDs = [], customer_id = {} } = order.data || {};
    const orderDetail = order.data || {}
    // let goodsData = [];
    // if (basicGoods.length) {
    //   let num = 0;
    //   let amount = 0;
    //   basicGoods.forEach(item => {
    //     num += Number(item.num);
    //     amount += Number(item.amount);
    //   });
    //   goodsData = basicGoods.concat({
    //     id: '总计',
    //     num,
    //     amount,
    //   });
    // }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      // if (index === basicGoods.length) {
      //   obj.props.colSpan = 0;
      // }
      return obj;
    };

    const productColumns = [
      {
        title: 'Product Code',
        dataIndex: 'prd_code',
        key: 'prd_code',
        // render: (text, row, index) => {
          // if (index < basicGoods.length) {
          //   return <a href="">{text}</a>;
          // }
          // return {
          //   children: <span style={{ fontWeight: 600 }}>总计</span>,
          //   props: {
          //     colSpan: 4,
          //   },
          // };
        // },
      },
      {
        title: 'Product Name',
        dataIndex: 'name',
        key: 'name',
        // render: renderContent,
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (text) =>{
          return <img style={{maxWidth:'100px'}}src={text}/>
        }
        ,
      },
      {
        title: 'Đơn Vị Tính',
        dataIndex: 'dvt',
        key: 'dvt',
        align: 'right',
        render: renderContent,
      },
      {
        title: 'Lưu Ý',
        dataIndex: 'note',
        key: 'note',
        align: 'right',
        render: (text, row, index) => {
          // if (index < basicGoods.length) {
          //   return text;
          // }
          return <span style={{ color: 'red' }}>{text}</span>;
        },
      },
      {
        title: 'Số Lượng',
        dataIndex: 'amount',
        key: 'amount',
        align: 'right',
        render: (text, row, index) => {
          // if (index < basicGoods.length) {
          //   return text;
          // }
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
    ];
    return (
      <PageHeaderWrapper title="CHI TIẾT ĐƠN HÀNG" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="Thông tin Khách Hàng" style={{ marginBottom: 32 }}>
            <Description term="Mã Khách Hàng"><b>{customer_id._id}</b></Description>
            <Description term="Tên Khách Hàng"><b>{customer_id.name}</b></Description>
            <Description term="Email"><b>{customer_id.email}</b></Description>
            
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="Thông Tin Đơn Hàng" style={{ marginBottom: 32 }}>
            <Description term="ĐỊA CHỈ GIAO HÀNG"><b>{orderDetail.delivery_address}</b></Description>
            <Description term="TIME GIAO HÀNG"><b>{moment(orderDetail.delivery_time).format('YYYY-MM-DD HH:mm:ss')}</b></Description>
            <Description term="SALES FORCE">{orderDetail.sale_force}</Description>
            <Description term="HOTLINE DELI">{orderDetail.hotline}</Description>
            <Description term="EMAIL">{orderDetail.receive_email}</Description>
            <Description term="CC QUA E-MAIL">{orderDetail.cc_emails}</Description>
            <Description term="LƯU Ý">{orderDetail.note}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>Thông Tin Sản Phẩm</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={productIDs}
            columns={productColumns}
            rowKey="id"
          />
          {/* <div className={styles.title}>退货进度</div> */}
          {/* <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          /> */}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default OrderDetail;
