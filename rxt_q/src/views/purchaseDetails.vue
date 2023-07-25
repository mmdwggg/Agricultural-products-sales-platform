<template>
  <div class="details-box">
    <div>
      <el-button @click="goBack" type="primary" icon="el-icon-caret-left" plain>返回</el-button>
    </div>
   
    <h4 class="title">{{ data.title }}</h4>
    <div class="time">
      <span>发布时间：{{ data.createTime | changeTime }}</span>
      <span style="margin-left: 50px;">最近修改时间：{{ data.updateTime | changeTime }}</span>
      <div class="item-style">
        <el-button type="danger" @click="addShopcartClick" v-if="data.type == 'goods'">加入购物车</el-button>

      </div>
    </div>
    <el-container>
  <el-container>
    <el-aside width="400px">
      <img :src="$store.state.imgShowRoad + '/file/' + data.picture" v-show="data.picture" alt="">
    </el-aside>
    <el-container>
      <el-main>
        <div >
      <div class="item-sales"><b>买家姓名：</b><span class="sales-text">{{data.ownName}}</span></div>
      <div class="item-sales"><b>买家地址：</b><span class="sales-text">{{data.address}}</span></div>
      <div class="item-sales"><b>更新时间：</b><span class="sales-text">{{data.updateTime | formatTimer}}</span></div>
      <div class="item-sales"><b>联系电话：</b><span class="sales-text">{{ updateUserData.phone }}</span>  <el-button type="primary" icon="el-icon-phone-outline" @click="open" circle size="small"></el-button></div>
      <div class="item-sales" :title="data.content"><b>买家需求：</b>
        <div class="item-sales">{{ data.content }}</div>
      </div>
    </div>
      </el-main>
    </el-container>
  </el-container>
</el-container>

    <div class="info">
      
    </div>

    
    
  </div>
</template>

<script>
import { addOrderToCart } from "../api/cart";
import { selectOrderById } from "../api/order";
import ChangeMessage from "../components/ChangeMessage.vue";
import { selectUserByUsername } from "../api/user";

export default {
  data() {
    return {
      data: [],
      ownerInfo: {},
      userGoods: [],
      updateGoodInfo: {},
      updateUserData:{}
    };
  },
  filters: {
    changeTime(time) {
      return time.slice(0, 10);
    },
    formatTimer: function(value) {
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
      return y + "-" + MM + "-" + d + " ";
    }
  },
  components: { ChangeMessage },
  props: {
    ctype: {
      type: String,
    },
    cdesciibe: {
      type: String,
    },
  },
  methods: {
    goBack() {
        this.$router.go(-1);
      },
    open() {
        this.$confirm('是否向拨打该买家电话？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '拨打中，请稍后'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消拨打'
          });          
        });
      },
    addShopcartClick() {
      addOrderToCart({
        order_id: this.data.orderId,
      })
        .then((res) => {
          console.log(res);
          if (res.flag == true) {
            alert(res.message);
          } else {
            alert(res.message);
          }
        })
        .catch((err) => {
          alert("添加失败,请先登录");
        });
    },
    changeInfo() {
      this.$store.commit("updateChangedOrderId", this.$store.state.changedOrderId);
      selectOrderById({
        order_id: this.$store.state.changedOrderId,
      })
        .then((res) => {
          this.updateGoodInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSalesInfo(){
      selectUserByUsername({
        user_name: this.data.ownName,
      }).then((res) => {
        this.updateUserData = res.data;
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  mounted() {
    this.$store.commit("updateActiveIndex", "3");
    selectOrderById({
      order_id: this.$route.query.orderId,
    }).then((res) => {
      if (res.flag == true) {
        this.data = res.data;

        this.getSalesInfo()
      }
    });
  },
};
</script>

<style lang="less" scoped>
.details-box {
  width: 1100px;
  min-height: 100%;
  height: auto;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  // align-items: center;
  img {
    width: 360px;
    height: 300px;
    margin: 50px auto 20px;
    border-radius: 6px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    line-height: 35px;
    max-height: 70px;
    text-align: center;
    margin-bottom: 20px;
  }
  .time {
    margin-top: 5px;
    color: #999;
    display: flex;
    justify-content: flex-end;
  }
  .info {
    width: 100%;
    min-height: 300px;
    border-radius: 6px;
    padding: 10px 20px;
    margin: 0 auto;
    display: flex;
    align-content: center;
    justify-content: center;
    .content {
      min-height: 100px;
      // border: 1px dashed #f2f2f2;
      line-height: 25px;
      padding: 5px 10px;
      /*超出的部分隐藏*/
      overflow: hidden;
      /*文字用省略号替代超出的部分*/
      text-overflow: ellipsis;
      /*弹性伸缩盒子模型显示*/
      display: -webkit-box;
      /*限制在一个块元素显示文本的行数*/
      -webkit-line-clamp: 4;
      /*设置或检索伸缩盒对象的子元素排列方式*/
      -webkit-box-orient: vertical;
    }
    .item-style{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 5px;
    }
    .marginL25{
    margin-left: 50px;
  }
  }
  .item-sales{
    color: #333 !important;
    line-height: 30px;
    max-height: 30px;
    .sales-text{
      color: #666;
    }
  }
}

  .el-aside {
    background-color: aliceblue;
    text-align: center;

  }
  
  .el-main {
    background-color: rgba(177, 250, 216, 0.546);
    height: 400px;
  }
  
 
  
</style>
