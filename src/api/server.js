// node
// import http from 'http'

// const server = http.createServer(function(req,res){
//     res.statusCode = 200
//     res.setHeader('Content-Type','Content-Type','text/html')
//     res.end('hello')
// })

// server.listen(3000, function(){
//     console.log('服务启动！');
// })

//express 
import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'

import Color from 'element-plus/es/components/color-picker/src/utils/color';

const secretKey = 'yuhuang026';


const app = express()
let userData = [
  {
       name: 'yuhu0',
       id: 1,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
  {
       name: 'yuhu',
       id: 2,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
  {
       name: 'yuhu1',
       id: 3,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
  {
       name: 'yuhu2',
       id: 4,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
  {
       name: 'yuhu3',
       id: 5,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
  {
       name: 'yuhu4',
       id: 6,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
  {
       name: 'yuhu4',
       id: 7,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
  {
       name: 'yuhu4',
       id: 8,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
  {
       name: 'yuhu4',
       id: 9,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
  {
       name: 'yuhu4',
       id: 10,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
  {
       name: 'yuhu4',
       id: 11,
       age: 21,
       sex: '男',
       bornTime: '2004-02-26',
       address: '西南科技大学'
  },
]
const adminData = [
  {
    name: 'yuhu',
    password: '123456',
    id: 1,
    level: 1,
    preLoginTime: ''
  },
  {
    name: 'admin',
    password: '123456',
    id: 2,
    level: 2,
    preLoginTime: ''
  },
  {
    name: 'yu',
    password: '123456',
    id: 3,
    level: 3,
    preLoginTime: '',
  },
]

let newUserID = userData.length

// 使用 body-parser 中间件来解析请求体中的数据
app.use(bodyParser.json()); // 解析 JSON 格式的请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码的请求体
//允许跨域
app.use(cors());
//获取首页表格数据
app.get('/home',function(req,res){
    console.log('reqs1',req.query);
    res.send({
        code:200,
        data:  [{
            name: 'oppo',
            todayBuy: 200,
            monthBuy: 2000,
            totalBuy: 20000,
          },
          {
            name: 'vivo',
            todayBuy: 200,
            monthBuy: 2000,
            totalBuy: 20000,
          },
          {
            name: 'huawei',
            todayBuy: 200,
            monthBuy: 2000,
            totalBuy: 20000,
          },
          {
            name: 'apple',
            todayBuy: 200,
            monthBuy: 2000,
            totalBuy: 20000,
          },
          {
            name: 'xiaomi',
            todayBuy: 200,
            monthBuy: 2000,
            totalBuy: 20000,
          },]
    })
})
//获取订单首页订单数据
app.get('/shopNumber',function(req,res){
    res.send({
        code:200,
        data: [
            {
            name: '今日支付订单',
            number: 1234,
            color: 'green',
            icon: 1,
            },
            {
            name: '今日收藏订单',
            number: 1234,
            color: 'yellow',
            icon: 2,
            },
            {
            name: '今日未支付订单',
            number: 120,
            color: 'pink',
            icon: 3
            },
            {
            name: '今日支付订单',
            number: 1234,
            color: 'green',
            icon: 1 ,
            },
            {
            name: '今日收藏订单',
            number: 1234,
            color: 'yellow',
            icon: 2,
            },
            {
            name: '今日未支付订单',
            number: 120,
            color: 'pink',
            icon: 3,
            },
         
    ]
    })
})
//获取折线图数据
app.get('/xchartData',function(req,res){
    res.send({
        code: 200,
        data: [{
          name: 'oppo',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'vivo',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'huawei',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'apple',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'xiaomi',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]})
})
//获取用户数据
app.get('/userData/:pageSize?',function(req,res){
  const pageSize = parseInt(req.params.pageSize)-1
  if(pageSize){
    const sum  = userData.length - pageSize*10
    const end =  sum < 10 ? sum : 10
    res.send({
      code:200,
      data: userData.slice(pageSize*10,pageSize*10+end),
      total: userData.length
    })
  }else{
    res.send({
        code: 200,
        data: userData.slice(0,10),
        total: userData.length
      })
  }

})
//删除用户数据
app.get('/userDel/:id',function(req,res){
  const userId = parseInt(req.params.id)
  console.log('req',req.params);
  const userIndex = userData.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    // 找到用户并从数组中删除
    userData.splice(userIndex, 1);
    res.status(200).send({
      code:200,
      message: '用户删除成功！'
    });
  } else {
    res.status(404).send({
      code: 404,
      message:'找不到要删除的用户'}
    );
  }
})

// 新增用户数据
app.post('/userAdd',function(req,res){
  const newUser = req.body; // 假设请求体中包含了要新增的用户信息
  console.log('newUser',newUser);
  // 在实际应用中，你可能需要进行验证和数据处理等操作
  
  // 将新用户添加到数组中
  const newUser2 = {...newUser,id:newUserID}
  newUserID+=1
  userData.unshift(newUser2);
  
  res.status(200).send({
    code: 200,
    message: '新增用户成功！'
  });
})
//编辑用户信息
app.post('/userEdit',function(req,res){
  const newUser = req.body; // 假设请求体中包含了要新增的用户信息
  const userId = newUser.id
  const userIndex = userData.findIndex(user => user.id === userId);
  userData[userIndex] = newUser
  res.send({
    code:200,
    message: '编辑成功！'
  })
})
//搜索用户信息
app.get('/userSearch/:userName',function(req,res){
  const userName = req.params.userName
  const couldData = userData.filter(item=>item.name.includes(userName))
  if(couldData){
    res.status(200).send({
      code:200,
      data:couldData,
      total:couldData.length
    })
  }
  else{
    res.status(404).send({
      code:404,
      data:null,
      message:'未找到该用户'
    })
  }
})

app.listen(3001,function(){
    console.log('服务启动');
})
//登录
app.post('/login',function(req,res){
  const formData = req.body
  const reqTime = new Date(Date.now()).toISOString().substring(0,10)
  console.log(formData);
  console.log(reqTime);
  const isObjectIncluded = adminData.some(obj => obj.name === formData.name && obj.password === formData.password);
  if(isObjectIncluded){
    const token = jwt.sign(formData, secretKey, { expiresIn: '1h' });
    const {level} = adminData.filter(obj =>  obj.name === formData.name && obj.password === formData.password)[0]
    adminData.forEach(obj => {
      if( obj.name === formData.name && obj.password === formData.password){
        obj.preLoginTime = reqTime
      }
    });
    res.send({
      code:200,
      data:{
        name: formData.name,
        token:token,
        level: level,
        preLoginTime: reqTime,
        preLoginAddress: '绵阳',
      }
    })
  }else{
    if(adminData.some(obj => obj.name === formData.name)){
      res.status(404).send({
        code:404,
        message: '用户密码错误'
      })
    }else{
      res.status(404).send({
        code:404,
        message: '用户名不存在'
      })
    }
  }
})

app.get('/getNav',function(req,res){
  const token = req.headers.token
  if(token){
    const decodedToken = jwt.verify(token, 'yuhuang026');
    const {level} = adminData.filter(obj =>  obj.name === decodedToken.name && obj.password === decodedToken.password)[0]
    // 解析后的令牌包含在decodedToken中，您可以在其中获取相关信息
    // 例如，decodedToken.userId 可能包含用户ID等
    res.send({
      code:200,
      message: 'ok',
      data: {
        level: level
      }
    })
  }
  else{
    console.log('token',token);
    res.status(404).send({
      code: 404,
      message: 'error'
    })
  }
})