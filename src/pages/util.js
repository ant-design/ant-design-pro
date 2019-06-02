/* eslint-disable */
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
  if(!option){
    info.pageNo=info.pageNo || 1;
    info.pageSize=pageSize || 10;
  }
  return {tableName,option,data:{info}};
}

// source: http://stackoverflow.com/questions/7390426/better-way-to-get-type-of-a-javascript-variable/7390612#7390612
function getType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
}

// returns a string "type" of input object
export function toType(obj) {
  let type = getType(obj);
  // some extra disambiguation for numbers
  if (type === 'number') {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(obj)) {
      type = 'nan';
      // eslint-disable-next-line no-bitwise
    } else if ((obj | 0) !== obj) {
      // bitwise OR produces integers
      type = 'float';
    } else {
      type = 'integer';
    }
  }
  return type;
}

const toCamelCaseVar = (variable) =>
  variable.replace(/\_+[a-zA-Z]/g,
    (str,index) => index ? str.substr(-1).toUpperCase() : str
  )

function camelToSpace(name) {
  return name.replace(/([A-Z])/g," $1").toLowerCase();
}

export function toApiSpecJson(obj,arr,parent){
  Object.keys(obj).forEach((key,index)=> {
    const value=obj[key];
    // console.log(key, value,toType(obj),parent);
    arr.push({name:key,type:toType(value),remark:camelToSpace(key),parent});
    if(toType(value)==='object'){
      toApiSpecJson(value,arr,key)
    }
    if(toType(value)==='array'){
      if(value.length>0) {
        toApiSpecJson(value[0], arr,key);
      }
    }
  })
}

export function getPlaceHolder(str) {
  const arrTmp = str.split("{");
  const retArr=[];
  arrTmp.forEach((val)=>{
    const dIntPos = val.indexOf("}");
    if(dIntPos>0){
      const paraName = val.substr(0, dIntPos);
      retArr.push({name:paraName,type:'string',remark:camelToSpace(paraName),parent:'-'});
    }
  })
  return retArr;
}

export function isJson(str) {
  try {
    JSON.parse(str);
  } catch(ex) {
    return {result:false,msg:ex.message};
  }
  return {result:true};
}

export function getQueryArr(str) {
  const retArr=[];
  if(str) {
    const queryString = str.split('?')[1] || '';
    const arr = queryString.split('&') || [];
    arr.forEach(val => {
      const keyValue = val.split('=');
      if (keyValue.length == 2) {
        const keyString = decodeURIComponent(keyValue[0]);
        const valueString = toType(decodeURIComponent(keyValue[1]));
        retArr.push({name:keyString,type: toType(valueString),remark:camelToSpace(keyString),parent:'-'});
      }
    });
    return retArr;
  }
}

