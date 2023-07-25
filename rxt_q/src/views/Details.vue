<template>
<div>
  <div class="details-box">
    <el-button @click="goBack" type="primary" icon="el-icon-caret-left" plain>返回</el-button>
  </div>
  <div class="details-box">
    <img v-if="data.picture" :src="$store.state.imgShowRoad + '/file/' + data.picture" alt="" />
    <img v-else src="../assets/img/wutu.gif" alt="" style="border:1px solid #f2f2f2;"/>
    <div class="info">
      <h4 class="title">{{ data.title }}</h4>
      <div class="content" :title="data.content">{{ data.content }}</div>
      <span class="price">￥{{ data.price }}</span>
      <div class="time">
        <span style="margin-right:30px;">发布时间：{{ data.createTime | changeTime }}</span>
        <span>最近修改时间：{{ data.updateTime | changeTime }}</span>
      </div>
      <div class="item-style">
        <div class="operation">
          <div class="operation-item"><img src="../assets/img/good.png" class="operation-img" alt="" /> 点赞</div>
          <div class="operation-item"><img src="../assets/img/no-star.png" class="operation-img" alt="" /> 收藏</div>
          <!-- <div class="operation-item" ><img @click="addComment" src="../assets/img/fill-in.png" class="operation-img" alt="" />评论</div> -->
           <div class="operation-item"  ><img @click="genEwm('ermId',data.title)" src="../assets/ewm.png" class="operation-img" alt="" />商品二维码</div>
        </div>      
        <div class="btn-content">
          <el-button type="danger" @click="addShopcartClick" v-if="data.type == 'goods'">加入购物车</el-button>
          <el-popover placement="right" width="320" trigger="hover">
            <div>
              <div class="item-sales">卖家姓名：<span class="sales-text">{{updateUserData.userName}}</span></div>
              <div class="item-sales">卖家地址：<span class="sales-text">{{updateUserData.address}}</span></div>
              <div class="item-sales">卖家手机号码：<span class="sales-text">{{updateUserData.phone}}</span></div>
              <div class="item-sales">更新时间：<span class="sales-text">{{updateUserData.updateTime | formatTimer}}</span></div>
            </div>
            <el-button type="danger" slot="reference" @click.once="changeInfo(item.orderId)" v-show="data.type == 'needs'">联系买家</el-button>

          </el-popover>
        </div>

       
      </div>
    </div>
  
      
      

  
   
  </div>
  <div style="width: 1100px; margin-left: 200px;"><el-input type="textarea" v-model="content" :rows="5"></el-input>
    <!-- <div>{{ content }}</div> -->
    <div style="margin-top:20px;display: flex;flex-direction: row;justify-content: flex-end">
      <el-button type="success" @click="handleComment">添加评论</el-button>
    </div>
    <div class="comment-container">
      <div class="comment-num">评论共{{commentArray.length||0}}条</div>
      <div class="comment-item" v-for="(item,index) in commentArray" :key="index">
        <div>{{item.content}}</div>
        <div class="comment-tips">
          <div style="margin-right:40px;">评论人：<span class="color6">{{item.ownName}}</span></div>
          <div>评论时间：<span class="color6">{{item.createTime|formatTimer2}}</span></div>
        </div>
      </div>
    </div>
  </div>



      <div id="qqq" style="display:none">

        <div id="qrCode" ref="qrCodeDiv"></div>
      </div>
  </div>
</template>

<script>
import { addOrderToCart } from "../api/cart";
import { selectOrderById,selectComment,addComment } from "../api/order";
import ChangeMessage from "../components/ChangeMessage.vue";
import { selectUserByUsername } from "../api/user";

import QRCode from "qrcodejs2"

export default {
  data() {
    return {
      content:'',
      commentArray: [],
      data: [],
      ownerInfo: {},
      userGoods: [],
      updateGoodInfo: {},
      updateUserData:{},
      isShow:false
    };
  },
  filters: {
    changeTime(time) {
      if(time){
         return time.slice(0, 10)
      }else{
        return ''
      }
     // return time.slice(0, 10)?time.slice(0, 10):'';
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
    },
    formatTimer2: function(value) {
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
      return y + "-" + MM + "-" + d + " "+h+":"+m;
    },
    goBack() {
        this.$router.go(-1);
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
    getData(){
      this.$store.commit("updateActiveIndex", "4");
      selectOrderById({
        knowledgeId: this.$route.params.id
      }).then((res) => {
        let tmp = res.data;
        if(tmp.picPath){
        const flieArr =  tmp.picPath.split('.')
        tmp.type = flieArr[flieArr.length - 1]
        this.updateInfo = tmp;
        }
        console.log('this.updateInfo',this.updateInfo)
      })
      .catch((err) => {
        console.log(err);
      });
    },
    // 查询评论
    getCommentData(){
      selectComment({
        orderId: this.$route.params.id
      }).then(res => {
        this.commentArray = res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    handleComment(){
      if(this.content===''){
        this.$message.error('评论内容不能为空！')
        return
      }
      if (localStorage.getItem('token')) {
        addComment({
          orderId: this.$route.params.id,
          content: this.content
          
        }).then(res=>{
          this.content=''
          this.$message.success('评论成功！')
          this.getCommentData()
        }).catch(err=>{
          console.log(err)
        })
      }else{
        this.$message.error('请先登录')
      }
    }
  ,
    handleClose(done) {
        this.dialogVisible1 = false
      },
      genEwm(classId,value){
        this.$nextTick(()=>{
           let isShow = document.getElementById("qqq").style.display;
      
           if(isShow == 'block'){
             document.getElementById("qqq").style.display = 'none'
             isShow = 'none'
           }else{
             document.getElementById("qqq").style.display = 'block'
              isShow = 'block'
           }
         
        })
      
      
       
      },
		 bindQRCode: function (value) {
  
             var that = this
          setTimeout(() => {
              var qrcode = new QRCode(that.$refs.qrCodeDiv, {
                  text: value, // 需要转换为二维码的内容
                  width: 200,
                  height: 200,
                  colorDark: '#000000',
                  colorLight: '#ffffff' 
              })
            }, 1000)
    }
	,
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
    changeInfo(item) {
      this.$store.commit("updateChangedOrderId", item);
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
    },
    goBack() {
        this.$router.go(-1);
      }
  },
  mounted() {
    this.getData();
    this.getCommentData();
    selectOrderById({
      order_id: this.$route.query.orderId,
    }).then((res) => {
      if (res.flag == true) {
        this.data = res.data;
        this.$nextTick(function () {
                this.bindQRCode(this.data.title);
        })
        this.getSalesInfo()
      }
    });
  },
};
</script>

<style lang="less" scoped>


#qqq {

  width:300px;
  height:300px;
  margin: 0 auto; /*水平居中*/
  position: relative;
}
 
#qrCode {
  display: inline-block;
  margin: 0 auto; /*水平居中*/
  position: relative;
  top: 15%;
 
  img {
    width: 200px;
    height: 200px;
    background-color: #fff; //设置白色背景色
    padding: 6px; // 利用padding的特性，挤出白边
  }
}
.details-box {
  width: 1100px;
  height: 100%;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  img {
    width: 360px;
    height: 300px;
    border-radius: 6px;
  }
  .info {
    position: relative;
    width: 680px;
    height: 300px;
    border: 1px solid #f2f2f2;
    // box-shadow: 3px 3px 3px rgba(3, 0, 0, 0.07);
    border-radius: 6px;
    padding: 10px 20px;
    .title {
      font-size: 22px;
      font-weight: bold;
      padding-left: 8px;
    }
    .content {
      height: 100px;
      border: 1px dashed #f2f2f2;
      line-height: 23px;
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
    .price {
      color: red;
      font-size: 25px;
      font-weight: bold;
    }
    .time {
      margin-top: 5px;
      color: #999;
      display: flex;
      justify-content: flex-start;
    }
    .item-style{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin-top: 5px;
      align-items: center;
    }
  }
  .operation {
    display: flex;
    margin-top: 10px;
    margin-right: 150px;
    .operation-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      .operation-img{
        width: 20px;
        height: 20px;
        margin-bottom: 5px;
        border-radius: 6px;
      }
    }
  }
  .btn-content{
    margin-top: 10px;
  }
  .item-sales{
    color: #333 !important;
    line-height: 30px;
    max-height: 30px;
    .sales-text{
      color: #666;
    }
  }
 .comment-container{
    clear: both;
    margin-top: 10px;
    .comment-num{
      font-weight: bold;
      margin-bottom: 8px;
    }
    .comment-item{
      border-bottom: 1px solid #f2f2f2;
      padding: 10px 20px;
      margin: 20px 0;
      word-break: break-all;
      .comment-tips{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding:8px 12px 8px 12px ;
        height: 70px;
        .color6{
          color: #666;
        }
      }
    }
  }
}
</style>
