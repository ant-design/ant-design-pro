import router from 'umi/router';
import { message } from 'antd';
import { query as queryRoles, addRole, queryById, updateRole, deleteById, menuAuth, menuAuthGet, permissionAuth, permissionAuthGet } from '@/services/role';
export default {
  namespace: 'role',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    role: {},
    roleMenuAuths: [],
    rolePermissAuths: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRoles, payload);
      yield put({
        type: 'fetchSave',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addRole, payload);
      console.log(response);
      if (response.code === 0) {
        message.success('保存成功', 2);
        router.push('/permission-management/role/list');
      } else {
        message.error(response.msg);
      }
    },
    *get({ payload }, { call, put }) {
      const response = yield call(queryById, payload);
      yield put({
        type: 'getSave',
        payload: response,
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateRole, payload);
      if (response.code === 0) {
        message.success('修改成功', 2);
        router.push('/permission-management/role/list');
      } else {
        message.error(response.msg);
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteById, payload);
      if (response.code === 0) {
        message.success('删除成功', 2);
        yield put({
          type: 'fetch',
          payload: {},
        });
      } else {
        message.error(response.msg);
      }
    },
    *menuAuth({ payload }, { call, put }) {
      const response = yield call(menuAuth, payload);
      if (response.code === 0) {
        message.success('操作成功', 2);
        yield put({
          type: 'menuAuthGet',
          payload: payload[0].roleId,
        });
      } else {
        message.error(response.msg);
      }
    },
    *menuAuthGet({ payload }, { call, put }) {
      const response = yield call(menuAuthGet, payload);
      if (response.code === 0) {
        yield put({
          type: 'getMenuAuthSave',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },
    *permissionAuth({ payload }, { call, put }) {
      const response = yield call(permissionAuth, payload);
      if (response.code === 0) {
        message.success('操作成功', 2);
        yield put({
          type: 'permissionAuthGet',
          payload: payload[0].roleId,
        });
      } else {
        message.error(response.msg);
      }
    },
    *permissionAuthGet({ payload }, { call, put }) {
      const response = yield call(permissionAuthGet, payload);
      if (response.code === 0) {
        yield put({
          type: 'getPermissionAuthSave',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },
  },
  reducers: {
    fetchSave(state, action) {
      return {
        ...state,
        data: {
          list: action.payload.data.content,
          pagination: {
            total: action.payload.data.totalElements,
            pageSize: action.payload.data.size,
            current: action.payload.data.number,
          },
        },
      };
    },
    getSave(state, action) {
      return {
        ...state,
        role: action.payload.data || {},
      };
    },
    getMenuAuthSave(state, action) {
      return {
        ...state,
        roleMenuAuths: action.payload.data || [],
      };
    },
    getPermissionAuthSave(state, action) {
      return {
        ...state,
        rolePermissAuths: action.payload.data || [],
      };
    },
  },
};
