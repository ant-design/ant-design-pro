
const refreshCacheError = {
  "code": "1005",
  "msg": "Token is error.",
  "data": null
};

const refreshCacheSuccess = {
  "code": "200",
  "msg": "Refresh Cache Success!",
  "data": null
};

export default {
  'GET /cache/refresh': refreshCacheError,
};
