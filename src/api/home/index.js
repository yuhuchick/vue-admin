import instance from "../request";
//获取首页表格数据
export const getTableData = () => {
    return instance.request({
        url: '/home',
        method: 'get'
    })
  }
//获取订单数据
export const getShopData = () => {
    return instance.request({
        url: '/shopNumber',
        method: 'get'
    })
  }
//获取折线图数据
export const getxchartData = () => {
    return instance.request({
        url: '/xchartData',
        method: 'get'
    })
}
