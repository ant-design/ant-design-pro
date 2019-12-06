import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { fakeSubmitForm } from './service';

export interface StateType {
  current?: string;
  step?: {
    payAccount: string;
    receiverAccount: string;
    receiverName: string;
    amount: string;
  };
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'formAndstepForm',

  state: {
    current: 'info',
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
  },
};

export default Model;
