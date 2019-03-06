import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { Effect } from 'dva';
import { Reducer } from 'redux';
import { fakeSubmitForm } from '@/services/api';

export interface IFormModelState {
  step: {
    payAccount: string;
    receiverAccount: string;
    receiverName: string;
    amount: string;
  };
}

export interface IFormModel {
  namespace: 'form';
  state: IFormModelState;
  effects: {
    submitRegularForm: Effect;
    submitStepForm: Effect;
    submitAdvancedForm: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<any>;
  };
}

const FormModel: IFormModel = {
  namespace: 'form',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};

export default FormModel;
