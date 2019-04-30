import {mapKeys,} from 'lodash';

export function conversion(responseData) {
  let retData=responseData;
  if(!responseData){
    retData= {
      list: [],
        pagination: {},
    }
  }
  else if(responseData.records){
    retData = mapKeys(responseData, (value, key) => {
      if (key === 'records') return 'list';
      if (key === 'page'){
        // mapKeys(responseData.page, (value1, key1) => {
        //   if (key1 === 'totalNesponseData.page, (value1, key1) => {
        //         //   if (key1 === 'totalNum'){
        //         //     return 'total';
        //         //   }
        //         //   return key1;
        //         // });um'){
        //     return 'total';
        //   }
        //   return key1;
        // });
        return 'pagination';
      }
      return key;
    });
  }


  return retData;
}

export function conversionReq(requestData) {
  const {tableName, option, pageSize, ...info} = requestData;
  info.pageNo=info.pageNo || 1;
  info.pageSize=pageSize || 10;
  return {tableName,option,data:{info}};
}
