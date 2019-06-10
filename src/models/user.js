import { query as queryUsers, queryCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      let response = yield call(queryCurrent);
      // console.log("------------",response);
      if (response.data && !response.data.avatar) {
        const simulateUser = {
          name: 'Serati Ma',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          userid: '00000001',
          id: 1,
          username: 'admin',
          email: 'liuyq6@asiainfo-int.com',
          signature: '海纳百川，有容乃大',
          title: '交互专家',
          group: 'AsiaInfo－国际部－ODC－O2P－UI',
          tags: [
            {
              key: '0',
              label: '很有想法的',
            },
            {
              key: '1',
              label: '专注设计',
            },
            {
              key: '2',
              label: '辣~',
            },
            {
              key: '3',
              label: '大长腿',
            },
            {
              key: '4',
              label: '小姐姐',
            },
            {
              key: '5',
              label: '海纳百川',
            },
          ],
          notifyCount: 12,
          unreadCount: 11,
          country: 'China',
          geographic: {
            province: {
              label: '福建省',
              key: '350000',
            },
            city: {
              label: '福州市',
              key: '350100',
            },
          },
          address: '福州 77 号',
          phone: '0591-268888888',
        };
        response = { ...simulateUser, ...response.data };
        response.name=response.username;
        // console.log('----22222--',response);
      }
      // setUser(response); // 这里设置会太晚了，不要设置
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
