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

export function getPayloadForUpdate(oldApiService,values) {
  const apiService1={...oldApiService,...values.front};
  const {apiServiceBackends,...apiService}=apiService1;
  const newApiServiceBackends = values.members.map((item) => {
    const {key, ...newItem} = item.backendId==='endpoint'?{...item,...values.back}:item;
    return newItem;
  });
  return {
    option:2, // 1-新增记录 2-修改记录
    data: {
      info: {
        apiService,
        apiServiceBackends:newApiServiceBackends,
      },
    },
  };
}
