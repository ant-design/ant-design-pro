// import { getLastPath } from './mockUtils';

const allResult = {
  code: 200,

  msg: '',

  data: [
    {
      groupId: 1,
      groupName: 'Billing',
      groupDesc: '',
      parentGroupId:0
    },
    {
      groupId: 2,
      groupName: 'CRM',
      groupDesc: '',
      parentGroupId:0
    },
    {
      groupId: 3,
      groupName: 'OSE',
      groupDesc: '',
      parentGroupId:0
    },
    {
      groupId: 4,
      groupName: 'Other',
      groupDesc: '',
      parentGroupId:0
    },
    {
      groupId: 5,
      groupName: 'Crm Order',
      groupDesc: '',
      parentGroupId:2
    },
    {
      groupId: 6,
      groupName: 'Crm Order Query',
      groupDesc: '',
      parentGroupId:5
    },
  ],
};

export default {
  [`GET /baseInfo/api/allGroupList`]: allResult,
};
