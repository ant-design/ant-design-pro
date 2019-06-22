import React,{PureComponent} from 'react';
import { Card, Table, Spin } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import {connect} from 'dva';

const { Description } = DescriptionList;
const { Column } = Table;


@connect(({ uniComp, loading }) => ({
  uniComp,
  loading: loading.models.uniComp,
}))
class Detail extends PureComponent {


  constructor(props) {
    super(props);
    // console.log("tableform props:",props);
    this.state = {
      loading:false,
      row: undefined,
    };
  }

  componentDidMount() {
    console.log("componentDidMount99999999:");
    const {selectedRow} = this.props;
    const {row:preRow} = this.state;
    console.log("componentDidMount88888:",selectedRow,preRow);

    const {columnSchemas} = this.props;
    const {reCallDetail}= columnSchemas;
    if(reCallDetail){
      this.setState({loading:true})
    }
    this.callDetail(selectedRow);
  }

  componentWillReceiveProps(nextProps) {
    const {selectedRow,columnSchemas} = this.props;
    const {selectedRow:nextSelectedRow} = nextProps;
    const {row:preRow} = this.state;
    console.log("componentWillReceiveProps 0000000:",selectedRow);
    console.log("componentWillReceiveProps 0000000:",nextSelectedRow);
    console.log("componentWillReceiveProps 0000000:",preRow);
    console.log(!preRow,!isEqual(preRow,nextSelectedRow))
    if (nextSelectedRow&&(!preRow||!isEqual(preRow[columnSchemas.key],nextSelectedRow[columnSchemas.key]))) {
      this.callDetail(nextSelectedRow);
    }
  }

  callDetail=(row)=>{

    const {columnSchemas,dispatch} = this.props;
    const {reCallDetail}= columnSchemas;
    console.log("reCallDetail2222222:",reCallDetail,row);
    if(reCallDetail&&row){
      this.setState({loading:true})
      dispatch({
        type: 'uniComp/detail',
        payload: {tableName:columnSchemas.tableName,id:row[columnSchemas.key]},
        callback: (resp) => {
          console.log("resp000000:",resp);
          this.setState({row:resp,loading:false});
        },
      });
    }
  }

  formatVal=(columnDetail,val)=>{
    if (columnDetail.format) {
      return moment(val).format(columnDetail.format);
    }
    // if (columnDetail.showLen !== undefined) {
    //   return (
    //     <Ellipsis length={columnDetail.showLen} tooltip>
    //       {val}
    //     </Ellipsis>
    //   );
    // }
    if (columnDetail.enumData != null) {
      const item = columnDetail.enumData.find(d => d.itemCode === val);
      const itemValue = item ? item.itemValue : '';
      return itemValue;
    }
    return val;
  }

  handleRelationCol=(columnDetails)=>{
    return columnDetails.map(columnDetail=>(<Column key={columnDetail.name} title={columnDetail.title} dataIndex={columnDetail.name} />))
  }

  handleRelation=(relations,row)=>{
    console.log("handleRelation row:",row);
    if(row&&relations){
      return relations.map(relation=>{
        if(row[relation.name]) {
          return (
            <Card key={relation.name} title={relation.title} bordered={false}>
              <Table dataSource={row[relation.name]} rowKey={relation.key} pagination={false}>
                {this.handleRelationCol(relation.columnDetails)}
              </Table>
            </Card>);
        }
        return null;
      });
    }
    return null;
  }


  descList=(selectedRow,columnDetails)=>{
    if(selectedRow){
      return (
        <Card title="Detail" bordered={false}>
          <DescriptionList size="large" col={2} title="" style={{ marginBottom: 32 }}>
            {columnDetails.filter(columnDetail=>(columnDetail.detail===undefined||columnDetail.detail)).map(columnDetail=>{
              return <Description key={columnDetail.name} term={columnDetail.title}>{this.formatVal(columnDetail,selectedRow[columnDetail.name])}</Description>
            })}
          </DescriptionList>
        </Card>
      );
    }
    return null;
  }

  render() {

    const {
      columnSchemas,selectedRow
    } = this.props;
    const {row,loading}  = this.state;
    console.log("-----render in detail ------:",row);
    const myRow=row||selectedRow;
    const {columnDetails, relations} = columnSchemas;
    return (
      <div key='detail'>
        <Spin tip="Loading..." spinning={loading} />
        {this.descList(myRow, columnDetails)}
        {this.handleRelation(relations, myRow)}
      </div>
    );
  }
}
export default Detail;
