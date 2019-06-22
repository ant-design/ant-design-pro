// 代码中会兼容本地 service mock 以及部署站点的静态数据
const roles={
  "code": "200",
  "msg": null,
  "data": [
    {
      "roleName": "admin",
      "roleId":1,
    },
    {
      "roleName": "manager",
      "roleId":2,
    },
    {
      "roleName": "user",
      "roleId":3,
    },
  ]
};
const loginResult={
    "code": "200",
    "msg": "",
    "data": {
      "currentAuthority": ["admin","user"],
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTU1NjA3MjkxNCwiZXhwIjoxNTU2MDc0NzE0fQ.XDPBiHG_wnjEMzzM5UnagY8ttTzkJimTQ3fmYIAZnpj53mpvdZ9tzDkM_muOpUe1lQGQv8T4ScL-wy4ma0cNLA",
    }
  };
export default {
  'POST /auth/login': (req, res) => {
    console.log("login request====:",req.body);
    const { password, userName } = req.body;
    // loginResult.data.info.username=userName;
    // loginResult.data.info.type=type;
    console.log("login response====:",req.body);
    res.set('RspUserName', userName);
    loginResult.data.username=userName;
    if (password === 'ant.design' && userName === 'admin') {
      loginResult.data.currentAuthority=["admin"];
      console.log("dddd====:",loginResult);
      loginResult.data.id=1;
      res.set('RspUserId', '1');
      res.send(loginResult);
      return;
    }
    if (password === 'ant.design' && userName === 'user') {
      loginResult.data.currentAuthority=["user"];
      loginResult.data.id=2;
      res.set('RspUserId', '2');
      res.send(loginResult);
      return;
    }
    if (password === 'ant.design' && userName === 'manager') {
      loginResult.data.currentAuthority=["manager"];
      loginResult.data.id=3;
      res.set('RspUserId', '3');
      res.send(loginResult);
      return;
    }
    if (password === 'ant.design' && userName === 'super_admin') {
      loginResult.data.currentAuthority=["admin",'manager','user'];
      loginResult.data.id=4;
      res.set('RspUserId', '4');
      res.send(loginResult);
      return;
    }
    res.send({
      "code": "201",
    });
  },
  'GET /baseInfo/sysdata/allRoleList': roles,
};
