import { list } from '../services/uniCompService';

export default {
  namespace: 'userModel',

  state: {
    userList: [],
  },

  effects: {
    *allUserList({ payload, callback }, { call, put }) {
      const params = {
        tableName: 'sys_user',
        data: {
          info: {
            // status: 'A',
            pageNo: 1,
            pageSize: 9999,
          },
        },
      };

      const response = yield call(list, params);
      console.log('response in user model:', response);

      yield put({
        type: 'save',
        action: { payload, response },
      });
      if (callback) callback(response);
    },
  },
  reducers: {
    save(state, { action }) {
      console.log('response in user model reducers:', action);
      const oriUserList =
        action.response && action.response.data ? action.response.data.records : [];

      const userList = action.payload.setDisabled
        ? oriUserList.map(item => {
            const itemTemp = item;
            // // console.log("======:",itemTemp.name === key,key,itemTemp.name);
            itemTemp.disabled = itemTemp.status !== 'A';
            return itemTemp;
          })
        : oriUserList;

      const formmatUserList = userList.map(item => ({ ...item, userId: item.id }));

      return {
        ...state,
        userList: formmatUserList,
      };
    },
  },
};
