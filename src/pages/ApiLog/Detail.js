import React, {PureComponent} from 'react';
import {Card, Col, Row} from 'antd';

import ReactJson from 'react-json-view';
import Ellipsis from '@/components/Ellipsis';
import DescriptionList from '@/components/DescriptionList';

const {Description} = DescriptionList;


const fieldLabels = {
  reqMessage: 'reqMessage',
  respMessage: 'respMessage',
  seq: 'seq',
  address: 'address',
}

class Detail extends PureComponent {


  getOrderItem = () => {

    const {orderItem} = this.props;
    return orderItem.map(item =>
      <Row>
        <Col>
          <Card title={`${item.orderItemCode}`} bordered={false} extra={`${item.createTime}`}>
            <DescriptionList>
              <Description term={fieldLabels.seq}>
                <Ellipsis tooltip length={20} style={{overflow: "inherit"}}>{`${item.seq}`}</Ellipsis>
              </Description>
              <Description term={fieldLabels.address}>
                <Ellipsis tooltip length={20} style={{overflow: "inherit"}}>{`${item.address}`}</Ellipsis>
              </Description>
            </DescriptionList>
            <DescriptionList>
              <Description>
                <div style={{width:250}}>
                  <Ellipsis tooltip length={280} style={{overflow: "inherit"}}>{`reqMessage: ${item.reqMessage}`}</Ellipsis>
                </div>
              </Description>
              <Description>
                <div style={{width:250}}>
                  <Ellipsis tooltip length={300} style={{overflow: "inherit"}}>{`respMessage: ${item.respMessage}`}</Ellipsis>
                </div>
              </Description>
            </DescriptionList>
          </Card>
        </Col>
      </Row>
    );

  }


  render() {

    return (

      <div>
        {this.getOrderItem()}
      </div>

    );
  }
}

export default Detail;
