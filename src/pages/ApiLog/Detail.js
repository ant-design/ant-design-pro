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
    console.log("detail",orderItem);
    return orderItem.map(item =>
      <Row>
        <Col>
          <Card title={`${item.orderItemCode}`} bordered={false}>
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
                <ReactJson
                  src={item.reqMessage}
                  name="reqMessage"
                  collapsed={false}
                  iconStyle='circle'
                />
              </Description>
              <Description>
                <ReactJson
                  src={item.respMessage}
                  name="reqMessage"
                  collapsed={false}
                  iconStyle='circle'
                />
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
