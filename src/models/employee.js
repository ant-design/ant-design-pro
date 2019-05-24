import { addEmployee, query, queryById } from '@/services/employee';
import { message } from 'antd';
import router from 'umi/router';
export default {
    namespace: 'employee',

    state: {
        data: {
            list: [],
            pagination: {},
        },
        employee: {},
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(query, payload);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *add({ payload }, { call, put }) {
            const response = yield call(addEmployee, payload);
            console.log(response);
            if (response.code === 0) {
                message.success('保存成功', 2);
                router.push('/basic-management/employee/list');
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
            console.log(payload)
            const response = yield call(updateUser, payload);
            if (response.code === 0) {
                message.success('修改成功', 2);
                router.push('/system-management/user/list');
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
        save(state, action) {
            return {
                ...state,
                data: {
                    list: action.payload.data.records,
                    pagination: {
                        total: action.payload.data.total,
                        pageSize: action.payload.data.size,
                        current: action.payload.data.current,
                    },
                },
            };
        },
        getSave(state, action) {
            return {
                ...state,
                employee: action.payload.data || {},
            };
        },
    },
};
