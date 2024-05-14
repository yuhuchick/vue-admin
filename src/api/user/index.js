import instance from "../request";

//获取用户数据
export const getUserData = (pageSize) => {
  return instance.request({
    url: pageSize ? `/userData/${pageSize}` : '/userData',
    method: 'get'
  });
};
//删除用户数据
export const delUserData = (id) => {
  return instance.request({
    url: `/userDel/${id}`,
    method: 'get',
  });
}
//添加用户数据
export const addUserData = (data) => {
  return instance.request({
    url: '/userAdd',
    method: 'post',
    data
  })
}
//编辑用户信息
export const editUserData = (data) =>{
  return instance.request({
    url: '/userEdit',
    method: 'post',
    data
  })
}
//搜索用户信息
export const searchUserData = (name) => {
  return instance.request({
    url: `/userSearch/${name}`,
    method: 'get',
  })
}
