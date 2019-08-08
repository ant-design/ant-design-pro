import React, {PureComponent} from 'react';
import {Card, Col, Row, Input} from 'antd';

import Ellipsis from '@/components/Ellipsis';
import DescriptionList from '@/components/DescriptionList';

const {Description} = DescriptionList;
const { TextArea } = Input;


const fieldLabels = {
  reqMessage: 'reqMessage',
  respMessage: 'respMessage',
  seq: 'seq',
  address: 'address',
}

class Detail extends PureComponent {


  getOrderItem = (reqTarget) => {

    const {orderItem} = this.props;
    return orderItem.map(item =>
      <Row>
        <Col>
          <Card title={`${item.orderItemCode}`} bordered={false} extra={`${item.createTime}`}>
            <DescriptionList>
              <Description style={{width:350}} term={fieldLabels.seq}>
                <div style={{width:330}}>
                  <Ellipsis tooltip length={20} style={{overflow: "inherit"}}>{`${item.seq}`}</Ellipsis>
                </div>
              </Description>
              <Description term={fieldLabels.address}>
                <Ellipsis tooltip length={20} style={{overflow: "inherit"}}>{`${reqTarget}`}</Ellipsis>
              </Description>
            </DescriptionList>
            <DescriptionList>
              <Description style={{width:350}}>
                <div style={{width:330}}>
                  <TextArea rows={20} value={item.reqMessage} />
                </div>
              </Description>
              <Description>
                <div style={{width:400}}>
                  <TextArea rows={20} value={item.respMessage} />
                </div>
              </Description>
            </DescriptionList>
          </Card>
        </Col>
      </Row>
    );

  }


  render() {
    const {reqTarget} = this.props;
    return (

      <div>
        {this.getOrderItem(reqTarget)}
      </div>

    );
  }
}

export default Detail;
