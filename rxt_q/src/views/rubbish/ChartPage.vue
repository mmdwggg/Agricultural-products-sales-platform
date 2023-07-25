<!-- 关于我们页面 -->
<template>
  <div class="about-container">

     <div class="small">
    
        <canvas id="myChart2" width="400px" height="400px"></canvas>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js';
import { selectOrder } from "../api/order";


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
