export function getPayload(option,apiService,newApiServiceBackends) {
  const {apiServiceBackends,...newApiService}=apiService;
  return {
    option, // 1-新增记录 2-修改记录
    data: {
      info: {
        apiService:newApiService,
        apiServiceBackends:newApiServiceBackends,
      },
    },
  };
}

export function conversionAttr(attrs) {
  const conversionAttrObj = {ssl:'close',authType:'noneAuth'};
  if (attrs) {
    attrs.forEach((item) => {
      conversionAttrObj[item.attrSpecCode] = item.attrValue;
    });
  }
  return conversionAttrObj;
}
/* eslint-disable no-nested-ternary */
const doAttr=(oldApiServiceBackendAttrs,backAttr,key) =>{
  const newAttr={"attrSpecCode":key,"attrValue":backAttr[key],act:'A'};
  const oldAttr=oldApiServiceBackendAttrs.find((item)=>(item.attrSpecCode===key));
  if(key==='authType'||key==='ssl'){
    console.log(oldApiServiceBackendAttrs,oldAttr);
  }
  const attr=oldAttr?(oldAttr[key]===backAttr[key]?{...oldAttr}:{...oldAttr,...newAttr,act:'U'}):newAttr;
  return attr;
}

// 需要删除属性数据
/* eslint-disable no-nested-ternary */
const removeAttr=(oldApiServiceBackendAttrs,newApiServiceBackendAttrs) =>{
  const removeAttrList=[];
  oldApiServiceBackendAttrs.forEach((item)=>{
    const newAttr=newApiServiceBackendAttrs.find((newItem)=>(newItem.attrSpecCode===item.attrSpecCode));
    if(!newAttr){
      removeAttrList.push({...item, act:'D'});
    }
  });
  return removeAttrList;
}

export function getPayloadForUpdate(oldApiService,values) {


  const apiService1={...oldApiService,...values.front};
  const {apiServiceBackends,...apiService}=apiService1;
  const newApiServiceBackends = values.members.map((item) => {
    const {key, ...newItem} = item.backendType==='endpoint'?{...item,...values.back}:item;
    return newItem;
  });

  // －－－－－do attr start－－－－－－－－－－－－
  const {backAttr}=values;
  const newApiServiceBackendAttrs=[];
  const oldApiServiceBackend = oldApiService.apiServiceBackends.find((item)=>(item.backendType==='endpoint'));
  const oldApiServiceBackendAttrs=oldApiServiceBackend.apiServiceBackendAttrs||[];
  newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'authType'));
  newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'ssl'));
  if(backAttr.authType==='basicAuth'){
    newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'userName'));
    newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'userPassword'));
  }
  else if(backAttr.authType==='fixedToken'){
    newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'tokenStr'));
  }
  else if(backAttr.authType==='dyncToken'){
    newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'tokenUser'));
    newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'tokenPassword'));
    newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'tokenUrl'));
  }
  if(backAttr.ssl==='open'){
    newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'trustStore'));
    newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'trustStorePassword'));
    newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'keyStore'));
    newApiServiceBackendAttrs.push(doAttr(oldApiServiceBackendAttrs,backAttr,'keyStorePassword'));
  }
  const removeAttrList=removeAttr(oldApiServiceBackendAttrs,newApiServiceBackendAttrs);
  newApiServiceBackendAttrs.push(...removeAttrList);
  // const keys=Object.getOwnPropertyNames(backAttr);
  // keys.forEach(key=>{
  //   if(backAttr[key]){
  //     const attr={"attrSpecCode":key,"attrValue":backAttr[key]};
  //     newApiServiceBackendAttrs.push(attr);
  //   }
  // })
  console.log("11111111newApiServiceBackends:",newApiServiceBackends);

  // －－－－－－－－－do attr end－－－－－－－－－

  const apiInfo= {
    option:2, // 1-新增记录 2-修改记录
    data: {
      info: {
        apiService,
        apiServiceBackends:newApiServiceBackends,
        apiServiceBackendAttrs:newApiServiceBackendAttrs
      },
    },
  };
  console.log("=======:",apiInfo);
  return apiInfo;
}

export function getPayloadForAccess(selectedRow,apiServiceOrgs) {
  const {apiServiceBackends,apiServiceOrgs:oriApiServiceOrgs,...apiService} = {...selectedRow};
  return {
    option:8, // 1-新增记录 2-修改记录,8-授权
    data: {
      info: {
        apiService,
        apiServiceBackends,
        apiServiceOrgs,
      },
    },
  };
}
