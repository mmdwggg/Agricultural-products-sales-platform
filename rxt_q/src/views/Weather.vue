<template>
  <div class="container" :style="{backgroundImage: 'url(' + bgImgUrl + ')', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}">
    <!-- 显示城市信息及当天天气信息 -->
    <div class="header">
      <!-- 城市信息 -->
      <div class="cityBox">
        <h1>{{weekData.city}}</h1>
        <div class="date margin-20">
          <span class="margin-right-20">{{dayData.date}}</span>
          <span>{{dayData.week}}</span>
        </div>
        <div class="airQuality">
          <span>空气质量：{{dayData.air_level}}</span>
        </div>
      </div>
      <!-- 选择地区 -->
      <div class="selectCity">
        <el-cascader
          size="large"
          filterable
          :options="options"
          v-model="selectedOptions"
          placeholder="请选择/搜索地区"
          @change="handleChange">
        </el-cascader>
      </div>
    </div>


    <div class="footer">
      <!-- 当天24小时天气 -->
      <div class="hourWeather">
        <ul>
          <li v-for="(item, index) in weekData.data" :key="index">
            <span>{{item.day}}</span>
            <img :src="require('@/assets/imgs/' + item.wea_day_img + '.png')" class="margin-top-20">
            <span class="margin-10">{{item.wea_day}}</span>
            <span class="margin-10">{{item.tem}}℃</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { regionData, CodeToText } from 'element-china-area-data'
  import { getRequest } from '../utils/api'
  export default {
    name: 'Weather',
    data () {
      return {
        options: regionData,
        selectedOptions: [],
        addressAll: [],
        address: '',
        weekData: [],
        dayData: {},
        airQuality: '',   // 空气质量
        bgImgUrl: '',  //  动态背景图
      }
    },
    created() {
      this.getAWeekWeather()
    },
    methods: {
      handleChange(value) {
        this.addressAll = []
        this.address = ""
        value.forEach(city => {
          this.addressAll.push(CodeToText[city])
        });
        if(this.addressAll[2] === '市辖区' || this.addressAll.length === 2) {
          this.address = this.addressAll[1].split('').slice(0, this.address.length-1).join('')
        }else {
          this.address = this.addressAll[2].split('').slice(0, this.address.length-1).join('')
        }
        
        console.log(this.address);
        this.getAWeekWeather()
      },
      // 获取一周天气
      getAWeekWeather() {
        getRequest({
          appid: '71666199',
          appsecret: '6FT2Kiq0',
          version: 'v91',
          city: this.address
        }).then(res => {
          console.log(res.data);
          this.weekData = res.data
          this.dayData = res.data.data[0]
          this.bgImgUrl = require(`@/assets/imgs/${res.data.data[0].wea_day_img}.jpg`)
        })
      }
    }
  }
</script>

<style scoped>
  body, 
  html,
  .container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  p, h1, h2, h3, h4, h5, h6, ul, li {
    margin: 0;
    padding: 0;
  }

  .container {
    width: 100%;
    height: 100%;
    background-color: antiquewhite;
    position: relative;
    /* color: #fff; */
  }
  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 100px 60px;
    box-sizing: border-box;
  }
  .margin-20 {
    margin: 20px 0;
  }
  .margin-10 {
    margin: 10px 0;
  }
  .margin-right-20 {
    margin-right: 20px;
  }
  .margin-top-20 {
    margin-top: 20px;
  }
  .footer {
    position: absolute;
    bottom: 40px;
    width: 100%;
		font-size: 16px;
  }
  .cityBox {
    background-color: rgba(255,255,255,.3);
    padding: 20px 30px;
    border-radius: 20px;
  }
  .hourWeather ul {
    display: flex;
  }
  .hourWeather ul li {
    background-color: rgba(255,255,255,.3);
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    box-sizing: border-box;
    height: 300px;
    margin-left: 2px;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: center;
    flex: 1;
  }
  .hourWeather ul li img {
    width: 50px;
    height: 50px;
  }
  .hourWeather ul li:first-child {
    /* width: 28%; */
    border-left: none;
    margin-left: 0;
  }
</style>