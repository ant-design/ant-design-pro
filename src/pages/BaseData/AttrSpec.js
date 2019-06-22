import React from 'react';
import BindDataQueryTable from '../BindDataQueryTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getItems } from '@/utils/masterData';

const statusList = getItems('common', 'status');

const columnSchemas = {
  tableName: 'attr_spec',
  key: 'attrSpecId',
  name: 'attrSpecCode',
  privileges:['attrSpec_save','attrSpec_statusBatch'],
  columnDetails: [
    { name: 'attrSpecId', title: 'ID', columnHidden: true, add: true, disabledAct:'true' },
    { name: 'adapterSpecId', title: 'Adapter', tag:'AdapterSelectView', sorter: false, add: true },
    { name: 'attrSpecCode', title: 'Attr Code', sorter: false, query: true, add: true,detailFlag:true },
    { name: 'desc', title: 'Attr Name',sorter: false, add: true },
    { name: 'defaultValue', title: 'Default Value', query: true,sorter: false, add: true ,rules:[],showLen:22},
    { name: 'tableName', title: 'Table Name',  columnHidden: true, defaultValue:'api_service_backend', disabledAct:'true',add: true },
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
export default () => (
  <PageHeaderWrapper title="Attr Spec Management">
    <BindDataQueryTable columnSchemas={columnSchemas} />
  </PageHeaderWrapper>
);
