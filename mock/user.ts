import type { Request, Response } from 'express';
import { waitTime, defaultUser } from './utils';

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

const tokenStore = new Map<string, { access: string; username: string }>();

function generateToken(): string {
  return `mock-token-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getTokenFromHeader(req: Request): string {
  const authHeader = req.headers.authorization || '';
  return authHeader.replace(/^Bearer\s+/i, '');
}

function issueToken(access: string, username: string, type: string, res: Response) {
  const token = generateToken();
  tokenStore.set(token, { access, username });
  res.send({ status: 'ok', type, currentAuthority: access, token });
}

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    // 预览模式默认有权限
    if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
      res.send({
        success: true,
        data: {
          ...defaultUser,
          access: 'admin',
        },
      });
      return;
    }
    const token = getTokenFromHeader(req);
    const entry = tokenStore.get(token);
    if (!token || !entry) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: '请先登录！',
        success: true,
      });
      return;
    }
    res.send({
      success: true,
      data: {
        ...defaultUser,
        access: entry.access,
      },
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === 'ant.design' && username === 'admin') {
      issueToken('admin', 'admin', type, res);
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      issueToken('user', 'user', type, res);
      return;
    }
    if (type === 'mobile') {
      issueToken('admin', 'mobile-user', type, res);
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    const token = getTokenFromHeader(req);
    if (token) {
      tokenStore.delete(token);
    }
    res.send({ data: {}, success: true });
  },
  'GET /api/500': (_req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (_req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (_req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (_req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET /api/login/captcha': async (_req: Request, res: Response) => {
    await waitTime(2000);
    return res.json('captcha-xxx');
  },
};