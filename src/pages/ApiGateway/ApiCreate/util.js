export function getPayload(d) {
  const payload = {
    option: 1, // 1-新增记录 2-修改记录（预留，暂时不支持）

    data: {
      info: {
        apiService: {
          name: d.apiName,
          serviceType: d.consumerServiceType,
          groupId: parseInt(d.groupId, 10),
          reqMethod: d.consumerMethod,
          actionName: d.actionName,
          requestUrl: d.consumerPath,
          createUser: d.createUser,
        },
        apiServiceBackend: {
          serviceType: d.producerServiceType,
          url: d.producerUrl,
          reqPath: d.producerPath,
          socketTimeout: d.producerSocketTimeout,
          connectTimeout: d.producerConnectTimeout,
        },
      },
    },
  };
  return payload;
}

export function test(payload) {
  return payload;
}
