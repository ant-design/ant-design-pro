import React from 'react';
import { Card, Table } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import moment from 'moment';


const { Description } = DescriptionList;
const { Column } = Table;

const formatVal=(columnDetail,val)=>{
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

const handleRelationCol=(columnDetails)=>{
  return columnDetails.map(columnDetail=>(<Column key={columnDetail.name} title={columnDetail.title} dataIndex={columnDetail.name} />))
}

const handleRelation=(relations,row)=>{
  if(row&&relations){
    return relations.map(relation=>{
      if(row[relation.name]) {
        return (
          <Card key={relation.name} title={relation.title} bordered={false}>
            <Table dataSource={row[relation.name]} rowKey="roleId" pagination={false}>
              {handleRelationCol(relation.columnDetails)}
            </Table>
          </Card>);
      }
      return null;
    });
  }
  return null;
}

const descList=(selectedRow,columnDetails)=>{
  if(selectedRow){
    return (
      <Card title="Detail" bordered={false}>
        <DescriptionList size="large" col={2} title="" style={{ marginBottom: 32 }}>
          {columnDetails.filter(columnDetail=>(columnDetail.detail===undefined||columnDetail.detail)).map(columnDetail=>{
            return <Description key={columnDetail.name} term={columnDetail.title}>{formatVal(columnDetail,selectedRow[columnDetail.name])}</Description>
          })}
        </DescriptionList>
      </Card>
    );
  }
  return null;
}

const Detail = React.memo(props => {
  const {
    columnSchemas: { columnDetails,relations },selectedRow,
  } = props;
  // console.log("-----:",selectedRow);

  return (
    <div key='detail'>
      {descList(selectedRow,columnDetails)}
      {handleRelation(relations,selectedRow)}
    </div>
  );
});

export default Detail;
