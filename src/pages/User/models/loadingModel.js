import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import {list} from "../../../services/uniCompService";
import { getPrivileges,setPrivileges,setFormatPrivileges } from '@/utils/authority';
import constants from '@/utils/constUtil';

const {PREFIX_PATH} = constants;



export default {
  namespace: 'loadingModel',

  state: {
  },

  effects: {
    *getMenuData(_, { call }) {
      // ------ start ---
      if(PREFIX_PATH!==""){
        const params = {
          tableName:'sys_privilege',
          data:{
            info:{
              pageNo: 1,
              pageSize: 999,
            }
          }
        };

        const response = yield call(list, params);
        setPrivileges(response.data.records);
        setFormatPrivileges(getPrivileges());
      }
    },
  },

  reducers: {
  },
};
