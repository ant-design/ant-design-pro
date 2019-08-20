import React, {PureComponent} from 'react';
import {Card, Col, Row, Input} from 'antd';

import Ellipsis from '@/components/Ellipsis';
import DescriptionList from '@/components/DescriptionList';
import {getItemValue} from '@/utils/masterData';

const {Description} = DescriptionList;
const { TextArea } = Input;


const fieldLabels = {
  reqMessage: 'reqMessage',
  respMessage: 'respMessage',
  seq: 'seq',
  encryptFlag: 'Encrypt Flag',
}

class Detail extends PureComponent {

  getSecretFlag = (secretFlag) =>{
    return secretFlag?getItemValue('apiOrderExt', 'secret_flag', secretFlag):"";
  }

  getOrderItem = () => {

    const {orderItem} = this.props;

    return orderItem?orderItem.map(item =>
      <Row>
        <Col>
          <Card title={`${item.orderItemCode}`} bordered={false} extra={`${item.createTime}`}>
            <DescriptionList>
              <Description style={{width:350}} term={fieldLabels.seq}>
                <div style={{width:330}}>
                  <Ellipsis tooltip length={20} style={{overflow: "inherit"}}>{`${item.seq}`}</Ellipsis>
                </div>
              </Description>
              <Description style={{width:350}} term={fieldLabels.encryptFlag}>
                <Ellipsis tooltip length={40} style={{overflow: "inherit"}}>{this.getSecretFlag(`${item.encryptFlag}`)}</Ellipsis>
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
    ):'The order item has not order message';

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
