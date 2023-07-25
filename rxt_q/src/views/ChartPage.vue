<template>
   <div class="user-buy">
    <div
      class="buy"
      v-for="(item, index) in userBuyList"
      :key="index"
      :style="(index + 1) % 2 === 0 ? 'margin-right:0px' : 'margin-right:20px'"
    >
      <img
        v-if="item.picture"
        :src="$store.state.imgShowRoad + '/file/' + item.picture"
        alt=""
        
      />
      <img
        v-else
        src="../assets/img/wutu.gif"
        style="border: 1px solid #f2f2f2"
      />
      <div class="right-content" >
        <div class="right-item">
          商品：<span class="item-text">{{ item.orderId }}</span>
        </div>
        
        <div class="right-item">
          订单号：<span class="item-text">{{item.purchaseId}}</span>
        </div>
        <div class="right-item">
          购买数：<span class="item-text">{{item.count}}</span>
        </div>
        <div class="right-item">
          单价：<span class="item-text">{{
            item.uninPrice
          }}</span>
        </div>
        <div class="item-content">
          <span class="price">￥ {{ item.sumPrice }}</span>
          <el-tag :type="item.type === 0 ? 'danger' : 'success'" size="mini">{{
            item.type === 0 ? "未发货" : "已发货"
          }}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectSell } from "../api/order";
export default {
  data() {
    return {
      userBuyList: [],
    };
  },
  filters: {
    formatTimer: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
    },
  },
  created() {
    this.$store.commit("updateUserActiveIndex", "3-1");
    selectSell({}).then((res) => {
      this.userBuyList = res.data;
    });
  },
};
</script>

<style lang="less" scoped>
.user-buy {
  margin: 0 auto;
  width: 900px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  background: #fff;
  padding: 0px 20px;
  .buy {
    box-sizing: border-box;
    width: 420px;
    margin: 20px 0 10px;
    height: 180px;
    border: 1px solid #f2f2f2;
    border-radius: 6px;
    display: flex;
    flex-direction: row;
    padding-right: 10px;
    justify-content: space-between;
    img {
      width: 200px;
      height: 180px;
      margin-right: 10px;
      border-radius: 6px;
    }
    .right-content {
      margin-top:8px ;
     width: 180px;
      .right-item {
        line-height: 30px;
        height: 30px;
        
        .item-text {
          color: #666;
          width: 190px;
          height: 50px;
          /*超出的部分隐藏*/
          overflow: hidden;
          /*文字用省略号替代超出的部分*/
          text-overflow: ellipsis;
          word-break: break-all;
          white-space: nowrap;
        }
      }
      .price {
        font-size: 16px;
        color: red;
      }
      .item-content {
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin-top: 5px;
      }
    }
  }
}
</style>






























<!-- 关于我们页面 
<template>
  <div class="about-container">

     <div class="small">
    
        <canvas id="myChart2" width="400px" height="400px"></canvas>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js';

export default {
    components: {

    },
    data() {
        return {

        }
    },
    mounted() {


        var ctx2 = document.getElementById("myChart2");

        var myChart2 = new Chart(ctx2, {
            type: "line",
            data: {
                labels: ["苹果", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [
                    {
                        label: "test1",
                        backgroundColor: "rgba(225,10,10,0.3)",
                        borderColor: "rgba(225,103,110,1)",
                        borderWidth: 1,
                        pointStrokeColor: "#fff",
                        pointStyle: "crossRot",
                        data: [60, 59, 0, 81, 56, 10, 40, 22, 32, 54, 10, 30],
                        cubicInterpolationMode: "monotone",
                        spanGaps: "false",
                        fill: "false"
                    }
                ]
            },
            options: {
                
            }

        });
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>

.small {
    width: 500px;
    height: 500px;
}

.about-container{
  width: 1100px;
  background: #fff;
  margin: 10px auto;
  padding: 50px 20px;
  height: 100%;
  display: flex;
  flex-flow: column;
  // justify-content: center;
  align-items: center;
  .logo{
    width: 292px;
    height: 261px;
  }
  .item-style{
    height: 25px;
    line-height: 25px;
  }
  .marginL25{
    margin-left: 25px;
  }
   .marginL25{
    margin-left: 25px;
  }
  .contact-us{
    display: flex;
    justify-content: flex-end;
  }
  .marginR105{
    margin-right: 105px;
  }
  .marginR50{
    margin-right: 30px;
  }
  .about-content{
    margin-top: 50px;
  }
}
</style>
-->