//设置键名，这里我设置的是固定的
const tokenKey = 'admin-token';

//设置token
export function setToken(token){
    return localStorage.setItem(tokenKey,token);
};
//获取token
export function getToken(){
    return localStorage.getItem(tokenKey);
};
//删除token
export function removeToken(){
    return localStorage.removeItem(tokenKey);
};
