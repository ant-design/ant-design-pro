// import { getLastPath } from './mockUtils';

const allResult = {
  code: 200,

  msg: '',

  data: [
    {
      groupId: 1,
      groupName: 'Billing',
      groupDesc: '',
    },
    {
      groupId: 2,
      groupName: 'CRM',
      groupDesc: '',
    },
    {
      groupId: 3,
      groupName: 'OSE',
      groupDesc: '',
    },
    {
      groupId: 4,
      groupName: 'Other',
      groupDesc: '',
    },
  ],
};

export default {
  [`GET /baseinfo/api/allGroupList`]: allResult,
};
