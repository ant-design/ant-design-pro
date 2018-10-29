import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority, isLogin } from '@/utils/authority';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

export default ({ children }) => {

    let pathName = children.props.location.pathname;
    const logined = isLogin();

    console.info(" logined : " + logined);
    if(logined){
      if ("/user/login" === pathName){
        return <Redirect to="/"/>
      }
      return  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login"/>}>
                {children}
              </Authorized>
    } else {
      return <Redirect to="/user/login"/>
    }
};
