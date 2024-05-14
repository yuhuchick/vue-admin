<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <div class="grid-content ep-bg-purple" />
      <!-- 个人信息栏 -->
      <el-card style="max-width: 480px" shadow="hover">
       <div class="user">
        <img src="../../assets/images/touxiang.jpg"/>
        <div class="userInfo">
          <p class="name">{{ userStore.userInfo.name }}</p>
          <p class="role">
            <span v-if="userStore.userInfo.level === 1">超级管理员</span>
            <span v-else-if="userStore.userInfo.level === 2">一级管理员</span>
            <span v-else="userStore.userInfo.level === 3">二级管理员</span>
          </p>
        </div>
      </div>
      <div class="userLogin">
        <p>上次登录时间: <span>{{ userStore.userInfo.preLoginTime }}</span></p>
        <p>上次登录地点：<span>{{ userStore.userInfo.preLoginAddress }}</span></p>
      </div>

      </el-card>
      <!-- 表格栏 -->
      <el-card shadow="hover" height="450px" style="margin-top: 20px;">
        <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val">

          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

<!-- 右侧 -->
    <el-col :span="16">
      <div class="grid-content ep-bg-purple" />
      <!-- 右侧顶部· -->
      <div class="rightTop">
        <el-card class="cardItem" shadow="hover" :body-style="{display:'flex',padding: 0,height: '100%'}" v-for="(item,index) in shopData" :key="index">
          <div style="width: 25%;height: 100%;text-align: center;line-height: 60px;" :style="{backgroundColor: item.color}">
            <el-icon :size="20" :style="{color: '#fff'}" >
              <CircleCheckFilled v-if="item.icon === 1"/>
              <StarFilled v-if="item.icon === 2"/>
              <CircleCloseFilled v-if="item.icon === 3"/>
            </el-icon>
          </div>
          <div style="margin-left: 5px;">
            <h2 style="font-size: 18px;font-weight: 600;margin-top: 5px;">${{ item.number }}</h2>
            <p style="font-size: 12px; color: #969494; margin-top: 5px;">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 右侧中部 echarts -->
      <div class="rightMiddle">
         <el-card style="height: 300px;" shadow="hover">
          <div ref="myChartContainer" style="height: 260px;width: 100%;"></div>
         </el-card>
      </div>
      <!-- 右侧底部 -->
      <div class="rightBottom">
        <el-card class="bottomL" shadow="hover" style="height: 250px; ">
          <div ref="barChart" style="height: 210px; width: 100%;"></div>
        </el-card>
        <el-card class="bottomR" shadow="hover" style="height: 250px;">
         <div ref="pieChart" style="height: 210px; width: 100%;"></div>
        </el-card>
      </div>
      </el-col>
    </el-row>
  </template>

<script setup>
import { ref ,onMounted, reactive} from 'vue'
import { getTableData,getShopData,getxchartData } from '@/api/home';
import {useUserStore} from '../../store/user.ts'
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';

const myChartContainer = ref()
const barChart = ref()
const pieChart = ref()
const tableData = ref([])
const shopData = ref([])
const barOption = reactive({
  title: {
    text: 'number'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
})
const userStore = useUserStore()

const dataSourse = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          {
            name: 'Cousin Jack',
            value: 2
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 2
              }
            ]
          },
          {
            name: 'Cousin Ben',
            value: 4
          }
        ]
      },
      {
        name: 'Aunt Jane',
        children: [
          {
            name: 'Cousin Kate',
            value: 4
          }
        ]
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5,
            itemStyle: {
              color: 'red'
            }
          },
          {
            name: 'Brother Peter',
            value: 1
          }
        ]
      }
    ]
  },
  {
    name: 'Mike',
    children: [
      {
        name: 'Uncle Dan',
        children: [
          {
            name: 'Cousin Lucy',
            value: 3
          },
          {
            name: 'Cousin Luck',
            value: 4,
            children: [
              {
                name: 'Nephew',
                value: 2
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          {
            name: 'Cousin Betty',
            value: 1
          },
          {
            name: 'Cousin Jenny',
            value: 2
          }
        ]
      }
    ]
  }
];
const pieOption = reactive({
  title: {
    text: 'pie',
  },
  visualMap: {
    type: 'continuous',
    min: 0,
    max: 10,
    inRange: {
      color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862']
    }
  },
  series: {
    type: 'sunburst',
    data: dataSourse,
    radius: [0, '90%'],
    label: {
      rotate: 'radial'
    }
  }
});
//echarts数据
const xOption = reactive({
  title: {
    text: '本周销量'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['oppo', 'vivo', 'huawei', 'apple', 'xiaomi'],
    right: 23,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: []
});

const initCharts = () => {
  const myChart = echarts.init(myChartContainer.value)
  const barsChart = echarts.init(barChart.value)
  const piesChart = echarts.init(pieChart.value)
  myChart.setOption(xOption)
  barsChart.setOption(barOption)
  piesChart.setOption(pieOption)
}
onMounted(()=>{
  getTableData().then(res=>{
    tableData.value = res.data
  })
  getShopData().then(res=>{
    shopData.value = res.data
  })
  getxchartData().then(res=>{
    xOption.series = res.data
    initCharts()
  })
  window.addEventListener('resize', () => {
    const myChart = echarts.getInstanceByDom(myChartContainer.value);
    if (myChart) {
      myChart.resize();
    }
  });
  window.addEventListener('resize', () => {
    const myChart = echarts.getInstanceByDom(barChart.value);
    if (myChart) {
      myChart.resize();
    }
  });
  window.addEventListener('resize', () => {
    const myChart = echarts.getInstanceByDom(pieChart.value);
    if (myChart) {
      myChart.resize();
    }
  });
})
const tableLabel = {
  name: '品牌',
  todayBuy: '今日销量',
  monthBuy: '本月销量',
  totalBuy: '总销量'
}
</script>

<style scoped>
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .user {
    display: flex;
    padding-bottom: 10px;
    border-bottom: 2px solid #ccc;
    align-items: center;
  }
  .userInfo {
    margin-left: 20px;
  }
  .name {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 8px;
  }
  .role {
    color: #969494;
  }
  .userLogin {
    padding-top: 10px;
    p {
      height: 30px;
      line-height: 30px;
      color: #969494;
      span {
        margin-left: 40px;
      }
    }
  }
  .rightTop {
    width: 100%;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .cardItem {
    width: 200px;
   flex: 0 0 calc(33.33% - 10px); /*  等分为三列，-10px 是为了腾出间距; */
    height: 50px;

  }
  .rightMiddle {
    height: 300px;
    margin-top: 20px;
  }
  .rightBottom {
    height: 250px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .bottomL {
      flex: 0 0 calc(50% - 10px);
    }
    .bottomR {
      flex: 0 0 calc(50% - 10px);

    }
  }
</style>