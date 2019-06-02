export function getPayload(option,apiService) {
  return {
    option, // 1-新增记录 2-修改记录
    data: {
      info: {
        apiService,
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

  // －－－－－－－－－do attr end－－－－－－－－－

  const apiService={...oldApiService,...values.front};
  const newApiServiceBackends = values.members.map((item) => {
    const {key, ...newItem} = item.backendType==='endpoint'?{...item,...values.back,apiServiceBackendAttrs:newApiServiceBackendAttrs}:item;
    return newItem;
  });
  apiService.apiServiceBackends=newApiServiceBackends;
  const apiInfo= {
    option:2, // 1-新增记录 2-修改记录
    data: {
      info: {
        apiService,
      },
    },
  };
  console.log("=======:",apiInfo);
  return apiInfo;
}

export function getPayloadForApiDoc(oldApiService,values) {



  const apiService={...oldApiService};
  const apiServiceDoc={...values,
    requestBodySpec:JSON.stringify(values.requestBodySpec),
    requestHeaderSpec:JSON.stringify(values.requestHeaderSpec),
    responseHeaderSpec:JSON.stringify(values.responseHeaderSpec),
    responseBodySpec:JSON.stringify(values.responseBodySpec),
    urlSpec:JSON.stringify(values.urlSpec),
    };
  if(apiService.apiServiceDoc){
    apiServiceDoc.apiId=apiService.apiServiceDoc.apiId;
    apiServiceDoc.apiServiceDocId=apiService.apiServiceDoc.apiServiceDocId;
  }
  apiService.apiServiceDoc=apiServiceDoc;
  const apiInfo= {
    option:9, // 1-新增记录 2-修改记录,9-apiDoc
    data: {
      info: {
        apiService,
      },
    },
  };
  console.log("=======:",apiInfo);
  return apiInfo;
}

export function getApiFlowData(values) {

  const apiFlowData={
    "nodes": [{
      "type": "node",
      "size": "50*50",
      "shape": "flow-circle",
      "color": "#FA8C16",
      "label": "start",
      "x": 50,
      "y": 150,
      "id": "0",
      "index": 0
    }, ],
    "edges": []
  };
  const {members}=values;
  let index=0;
  const sortMembers=members.sort((a,b) => {return a.serviceSeq-b.serviceSeq;});
  console.log("==:",sortMembers)
  sortMembers.forEach((item) => {
    // if(item.backendType!=='endpoint'){
    index+=1;
    const preNode=apiFlowData.nodes[apiFlowData.nodes.length-1];
    apiFlowData.nodes.push({
      "type": "node",
      "size": "60*40",
      "shape": item.backendType==='endpoint'?"flow-rect":"flow-rect",
      "color": item.backendType==='endpoint'?'#722ED1':"#1890FF",
      "label": item.backendType,
      "x": 100+60*index,
      "y": 150,
      "id": `${item.serviceSeq}`,
      "index": index,
    });
    index+=1;
    const nextNode=apiFlowData.nodes[apiFlowData.nodes.length-1];
    apiFlowData.edges.push({
      "source": preNode.id,
      "sourceAnchor": 1,
      "target": nextNode.id,
      "targetAnchor": 3,
      "id": `${preNode.id}${nextNode.id}`,
      "index": index
    });
    // }
  });
  index+=1;
  const preNode=apiFlowData.nodes[apiFlowData.nodes.length-1];
  apiFlowData.nodes.push({
    "type": "node",
    "size": "50*50",
    "shape": "flow-circle",
    "color": "#FA8C16",
    "label": "end",
    "x": 100+60*index,
    "y": 150,
    "id": "999",
    "index": index,
  });
  index+=1;
  const nextNode=apiFlowData.nodes[apiFlowData.nodes.length-1];
  apiFlowData.edges.push({
    "source": preNode.id,
    "sourceAnchor": 1,
    "target": nextNode.id,
    "targetAnchor": 3,
    "id": `${preNode.id}${nextNode.id}`,
    "index": index
  });

  return apiFlowData;
}
export function getPayloadForAccess(apiService) {
  // const {apiServiceBackends,apiServiceOrgs:oriApiServiceOrgs,...apiService} = {...selectedRow};
  return {
    option:8, // 1-新增记录 2-修改记录,8-授权
    data: {
      info: {
        apiService
      },
    },
  };
}
