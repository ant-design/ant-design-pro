import constants from '@/utils/constUtil';

const { STATUS } = constants;

export function getRouteDatas(routes){
  return routes[1].routes;
}

export function conversion(item){
  const {component,redirect,...privilege}={...item};
  privilege.hideChildrenInMenu=privilege.hideChildrenInMenu?'Y':'N';
  privilege.hideInMenu=privilege.hideInMenu?'Y':'N';
  return privilege;
}

export const allRoleList=[
  {
    "roleId": 1,
    "roleName": "admin",
    "remark": "admin",
    "status": STATUS.A,
  },
  {
    "roleId": 2,
    "roleName": "manager",
    "remark": "",
    "status": STATUS.A,
  },
  {
    "roleId": 3,
    "roleName": "user",
    "remark": "",
    "status": STATUS.A,
  },
];

let innerStartIndex=0;
let innerPrivilegeRoleId=0;

export function toSimulatePrivilege(privileges,routes,isInit,isFlat,parentPrivilege){
  if(isInit){
    innerStartIndex=0;
    innerPrivilegeRoleId=0;
  }
  let orderSeq=0;
  routes.forEach((item)=> {
    if(item.name){
      innerStartIndex += 1;
      orderSeq +=1;
      const privilege = conversion(item);
      privilege.privilegeId = innerStartIndex;
      privilege.parentPrivilegeId = parentPrivilege?parentPrivilege.privilegeId:0;
      // privilege.level=parentPrivilege?parentPrivilege.level+1:1;
      privilege.orderSeq=orderSeq;
      privilege.status=STATUS.A;
      privilege.type='menu';
      const child = privilege.routes;
      delete privilege.routes;
      const {authority}=privilege;
      if(authority&&authority.length>0){
        const sysPrivilegeRoles=authority.map((value)=>{
          innerPrivilegeRoleId+=1;
          const role=allRoleList.find((roleItem)=>(roleItem.roleName===value));
          const sysPrivilegeRole={"id":innerPrivilegeRoleId,privilegeId:privilege.privilegeId,"roleId":role?role.roleId:null,roleName:value};
          return sysPrivilegeRole;
        });
        delete privilege.authority;
        privilege.sysPrivilegeRoles=sysPrivilegeRoles;
      }
      privileges.push(privilege);
      if(child&&child.length>0){
        if(!isFlat){
          privilege.children=[];
        }
        toSimulatePrivilege(isFlat?privileges:privilege.children,child,false,isFlat,privilege);
      }
    }
  });
}

export function flatToTree(list, data, fatherId) {
  list.forEach(item => {
    if (item.parentPrivilegeId === fatherId) {
      const child = {...item, children: []};
      flatToTree(list, child.children, item.privilegeId);
      if(child.children.length===0){
        delete child.children;
      }
      data.push(child);
    }
  })
}

export function filterAndConversionMenu(flatDatas) {
  const filterDatas=flatDatas.map((item)=>(item.type==='menu'&&item.status==='A'));
  filterDatas.map((item)=>{
    const {type,status,...newItem}=item;
    return newItem;
  });
}
export function flatToMenuTree(list, data, fatherId) {
  // console.log(list,fatherId);
  list.forEach(item => {
    if (item.parentPrivilegeId === fatherId&&item.type==='menu') {
      const child = {...item, routes: []};
      flatToMenuTree(list, child.routes, item.privilegeId);
      if(child.routes.length===0){
        delete child.routes;
      }
      const {sysPrivilegeRoles}=child;
      if(sysPrivilegeRoles && sysPrivilegeRoles.length>0){
        const authority=sysPrivilegeRoles.map((role)=>(role.roleName));
        child.authority=authority;
        delete child.sysPrivilegeRoles;
      }
      delete child.type;
      delete child.status;
      delete child.parentPrivilegeId;
      delete child.privilegeId;
      // delete child.level;
      delete child.orderSeq;
      child.hideChildrenInMenu=!!(child.hideChildrenInMenu&&child.hideChildrenInMenu==='Y');
      child.hideInMenu=!!(child.hideInMenu&&child.hideChildrenInMenu==='Y');
      data.push(child);
    }
  })
}

let array1 = [];
function getIndex(reg, str) {
  do{
    reg.test(str)
    if(reg.lastIndex !== 0 && reg.lastIndex-1 !== 0){// reg.lastIndex-1 !== 0判断首字母是否大写
      array1.push(reg.lastIndex-1)
    }
  }while(reg.lastIndex > 0)
}

function strReplace(str) {
  array1=[];
  const UP_CASE_REG =/[A-Z]/g;
  const NUMBER_REG=/[A-Za-z][\d]/g;
  let newstr = "";
  getIndex(UP_CASE_REG, str);
  getIndex(NUMBER_REG, str);
  array1.sort((a,b)=> a-b );
  for(let i = 0,len=array1.length;i < len; i+=1) {
    if(i === 0) {
      newstr += `${str.slice(0,array1[i])}_`;
    }
    else {
      newstr += `${str.slice(array1[i-1],array1[i])}_`;
    }
  }
  newstr += str.slice(array1[array1.length-1])
  return newstr.toLowerCase()
}

function getInsertSql(item,tableName){
  const entries=Object.entries(item);
  const values=entries.map((arr)=>(arr[1]));
  const keys=entries.map((arr)=>(strReplace(arr[0])));
  const valueStr=`'${values.join("','")}'`;
  const keyStr=keys.join(",");
  const sql=`insert into ${tableName} (${keyStr}) values(${valueStr});`;
  return sql;
}
export function toInsertSql(privileges){
  const sqlArray=[];
  sqlArray.push("delete from sys_privilege_role where privilege_id in (select privilege_id from sys_privilege where type='menu');");
  sqlArray.push("delete from sys_role where role_id in(1,2,3);");
  sqlArray.push("delete from sys_privilege where type='menu';");
  allRoleList.forEach((item)=>{
    sqlArray.push(getInsertSql(item,'sys_role'));
  });
  privileges.forEach((item)=>{
    // console.log("====:",item);
    const {sysPrivilegeRoles,children,...privilege}=item;
    // console.log("====:",privilege);
    sqlArray.push(getInsertSql(privilege,'sys_privilege'));
    if(sysPrivilegeRoles&&sysPrivilegeRoles.length>0){
      sysPrivilegeRoles.forEach((item2)=>{
        const {roleName,...newPrivilegeRole}=item2;
        sqlArray.push(getInsertSql(newPrivilegeRole,'sys_privilege_role'));
      });
    }
  });

  sqlArray.push("commit;");
  return sqlArray;
}

