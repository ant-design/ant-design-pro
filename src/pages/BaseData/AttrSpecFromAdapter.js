import React from 'react';
import BindDataQueryTable from '../BindDataQueryTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';

const statusList = getItems('common', 'status');

const columnSchemas = {
  tableName: 'attr_spec',
  key: 'attrSpecId',
  name: 'attrSpecCode',
  relationKeyForMasterTable:'adapterSpecId',
  masterTableKey:'id',
  columnDetails: [
    { name: 'attrSpecId', title: 'ID', add: true, disabledAct:'true' },
    { name: 'attrSpecCode', title: 'Attr Code', sorter: false, query: true, add: true },
    { name: 'desc', title: 'Attr Name', sorter: false, query: true, add: true },
    { name: 'defaultValue', title: 'Default Value', sorter: false, add: true ,rules:[]},
    { name: 'tableName', title: 'Table Name', defaultValue:'api_service_backend', disabledAct:'true',add: true },
    { name: 'upId', title: 'Up Id', sorter: false, add: true,defaultValue:'0',},
    {
      name: 'status',
      title: 'Status',
      columnHidden: false,
      query: false,
      add: true,
      tag: 'commonSelect',
      enumData: statusList,
    }, // 需要作为查询条件，新增时需要采集，需要使用绑定的下拉标签
  ]
};
export default (props) => {
  const { location } = props;
  const { state } = location;
  // console.log("location state:",state);
  const { record } = state;
  const name=record?record.name:'info'
  return (
    <PageHeaderWrapper
      onBack={() => window.history.back()}
      style={{ height: '50px' }}
      title={`Attr Spec Management for Adapter:${name}`}
    >
      <BindDataQueryTable columnSchemas={columnSchemas} masterRecord={record} />
    </PageHeaderWrapper>
  );
};
