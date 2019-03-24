import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './OrderDetail.less';
import moment from 'moment';
import Link from 'umi/link';

const { Description } = DescriptionList;


@connect(({ saleOrder, loading }) => ({
  order:saleOrder,
  loading: loading.global,
}))
class OrderDetail extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      type: 'saleOrder/detail',
      payload:params.id ,
    });
  }

  render() {
    const { order = {}, loading } = this.props;
    // console.log(loading)
    const { products = [], customer = {} } = order.data || {};
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
      return obj;
    };

    const productColumns = [
      
      {
        title: 'Tên Sản Phẩm',
        dataIndex: 'product.name',
        key: 'product.name',
        render: (text, row, index) => {
          return <a href={'/sale/products/' + row._id}>{text}</a>;
        },
      },
      {
        title: 'Loại',
        dataIndex: 'product.type',
        key: 'product.type',
        align: 'center',
        render: renderContent,
      },
      {
        title: 'Hình Ảnh',
        dataIndex: 'product.image_url',
        key: 'product.image_url',
        render: (text) =>{
          return <img style={{maxWidth:'100px'}}src={text}/>
        }
        ,
      },
      {
        title: 'Số Lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'right',
        render: (text, row, index) => {
          return <span style={{ fontWeight: 600 }}>{text}</span>;
        },
      },
      {
        title: 'Đơn Vị Tính',
        dataIndex: 'product.dvt',
        key: 'product.dvt',
        align: 'right',
        render: renderContent,
      },
      {
        title: 'Lưu Ý',
        dataIndex: 'note',
        key: 'note',
        align: 'right',
        render: (text, row, index) => {
          return <span style={{ color: 'red' }}>{text}</span>;
        },
      },
      
    ];
    return (
      <PageHeaderWrapper title="CHI TIẾT ĐƠN HÀNG" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="THÔNG TIN KHÁCH HÀNG" style={{ marginBottom: 32 }}>
            <Description term="Tên Khách Hàng"><Link to={"/sales/customers/" + customer._id}><b>{customer.name}</b></Link></Description>
            <Description term="Số Điện Thoại"><b>{customer.phone}</b></Description>
            <Description term="Email"><b>{customer.email}</b></Description>
            <Description term="Địa Chỉ"><b>{customer.address}</b></Description>
            
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="THÔNG TIN ĐƠN HÀNG" style={{ marginBottom: 32 }}>
            <Description term="Địa Chỉ Giao Hàng"><b>{orderDetail.delivery_address}</b></Description>
            {orderDetail.delivery_time && <Description term="Thời Gian Giao Hàng"><b>{moment(orderDetail.delivery_time[0].delivery_time).format('HH:mm - DD/MM')}</b></Description>}
            <Description term="SALES FORCE">{orderDetail.sale_force}</Description>
           
            <Description term="Lưu Ý">{orderDetail.note}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="THÔNG TIN THANH TOÁN" style={{ marginBottom: 32 }}>
            <Description term="Thanh Toán bằng"><b>{orderDetail.payment_type}</b></Description>
            <Description term="Tình Trạng Thanh Toán"><b>{orderDetail.payment_status}</b></Description>
            <Description term="Lưu Ý">{orderDetail.payment_note}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>Thông Tin Sản Phẩm</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={products}
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
