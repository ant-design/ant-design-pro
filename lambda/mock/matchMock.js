const pathToRegexp = require('path-to-regexp');
const bodyParser = require('body-parser');

const mockFile = require('./index');

const BODY_PARSED_METHODS = ['post', 'put', 'patch'];

const debug = console.log;
function parseKey(key) {
  let method = 'get';
  let path = key;
  if (key.indexOf(' ') > -1) {
    const spliced = key.split(' ');
    method = spliced[0].toLowerCase();
    path = spliced[1]; // eslint-disable-line
  }
  const routerBasePath = `${path}`;
  return {
    method,
    path: routerBasePath,
  };
}

function createHandler(method, path, handler) {
  return (req, res, next) => {
    function sendData() {
      if (typeof handler === 'function') {
        handler(req, res, next);
      } else {
        res.json(handler);
      }
    }
    if (BODY_PARSED_METHODS.includes(method)) {
      bodyParser.json({ limit: '5mb', strict: false })(req, res, () => {
        bodyParser.urlencoded({ limit: '5mb', extended: true })(req, res, () => {
          sendData();
        });
      });
    } else {
      sendData();
    }
  };
}

function normalizeConfig(config) {
  return Object.keys(config).reduce((memo, key) => {
    const handler = config[key];
    const { method, path } = parseKey(key);
    const keys = [];
    const re = pathToRegexp(path, keys);
    memo.push({
      method,
      path,
      re,
      keys,
      handler: createHandler(method, path, handler),
    });
    return memo;
  }, []);
}

const mockData = normalizeConfig(mockFile);

function matchMock(req) {
  const { path: exceptPath } = req;
  const exceptMethod = req.method.toLowerCase();
  function decodeParam(val) {
    if (typeof val !== 'string' || val.length === 0) {
      return val;
    }

    try {
      return decodeURIComponent(val);
    } catch (err) {
      if (err instanceof URIError) {
        err.message = `Failed to decode param ' ${val} '`;
        err.statusCode = 400;
        err.status = 400;
      }

      throw err;
    }
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const mock of mockData) {
    const { method, re, keys } = mock;
    if (method === exceptMethod) {
      const match = re.exec(req.path);
      if (match) {
        const params = {};

        for (let i = 1; i < match.length; i += 1) {
          const key = keys[i - 1];
          const prop = key.name;
          const val = decodeParam(match[i]);

          if (val !== undefined || !hasOwnProperty.call(params, prop)) {
            params[prop] = val;
          }
        }
        req.params = params;
        return mock;
      }
    }
  }

  return mockData.filter(({ method, re }) => method === exceptMethod && re.test(exceptPath))[0];
}
module.exports = (req, res, next) => {
  const match = matchMock(req);
  if (match) {
    debug(`mock matched: [${match.method}] ${match.path}`);
    return match.handler(req, res, next);
  }
  return next();
};
