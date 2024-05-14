import instance from './request'

export const doLogin = (data) => {
    return instance.request({
        url: '/login',
        method: 'post',
        data
    })
}
export const nav = () => {
    return instance.request({
        url: '/getNav',
        method: 'get',
    })
}