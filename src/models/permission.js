import router from 'umi/router';
import { message } from 'antd';
import { query, addPermission, updatePermission, deleteById } from '@/services/permission';
export default {
    namespace: 'permission',
    state: {
        data: {
            list: [],
            pagination: {},
        },
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(query, payload);
            yield put({
                type: 'fetchSave',
                payload: response,
            });
        },
        *add({ payload }, { call, put }) {
            const response = yield call(addPermission, payload);
            console.log(response);
            if (response.code === 0) {
                message.success('保存成功', 2);
                yield put({
                    type: 'fetch',
                    payload: {},
                });
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
            const response = yield call(updatePermission, payload);
            if (response.code === 0) {
                message.success('修改成功', 2);
                yield put({
                    type: 'fetch',
                    payload: {},
                });
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
                        current: action.payload.data.number + 1,
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
    },
};
