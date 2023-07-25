<template>
	<div>
		  <!-- <el-button @click="visible11" type="primary">打开聊天框</el-button> -->
          <el-dialog :visible.sync="visible" title="对话框">
        <div style="height: 500px; overflow-y: auto" id="bigBox">
<!-- ******* -->
<span style="width: 100%; min-height: 100px;">
                <img style="
                float: left;
                  width: 50px;
                  height: 50px;
                  /* vertical-align: middle; */
                  vertical-align: -webkit-baseline-middle;
                  border-radius: 50%;
                  margin-left: 10px;
                  margin-right: 10px;
                " src="../assets/machine.png" alt="" />

                    <span style="float: left; ">
            <div class="box-card-like">
              <div class="card-header-like">
                猜你感兴趣：
              </div>
              <div class="text item-like">
                <span class="t1" @click="redChili">红辣椒<el-icon></el-icon> </span>
                <span class="t1" @click="bean">大豆种植</span>
                <span class="t2" @click="pepino">长生不老</span>
            </div>
    </div>
    </span>
</span> 
          <div
            style="width: 100%; min-height: 100px;"
            v-for="(item, index) in list"
            class="msgCss"
            :style="{textAlign: item.align}"
          >
            <div style="width: 100%; min-height: 100px;">
              <span
                style="width: 100%; min-height: 100px;"
                v-if="item && item.align == 'left'"
              >
              <img
                style="
                float: left;
                  width: 50px;
                  height: 50px;
                  vertical-align: -webkit-baseline-middle;
                  border-radius: 50%;
                  margin-left: 10px;
                  margin-right: 10px;
                "
                src="../assets/machine.png"
                alt=""
              />
              <span style="float: left; " v-if="item && item.link == ''">
                <div class="box-card">
                  <div class="card-header">
                    猜你想问：
                  </div>
                  <div class="text item">
                    <div class="t1" @click="hisPurch">
                      查看历史订单<el-icon><ArrowRight /></el-icon>
                    </div>
                    <div class="t1" @click="hisQuestion">如何查看我的问答记录</div>
                    <div class="t1" @click="moreKnowledge">农业知识求解</div>

                    <div class="t2" @click="aboutUs">了解我们</div>
                  </div>
                </div></span
              >
              <span v-if="item && item.link"
                >: <a :href="item.link" target="_blank">{{item.text}}</a></span
              >
            </span>
           </div>
            <span v-if="item && item.align == 'right'">
              <span
                  style="display: inline-block; min-width:50px;padding-right:8px;min-height: 28px;border-radius: 5px;  vertical-align: middle; background-color: rgb(243, 243, 243);"
                  >{{item.text}}</span
                ><img
                style="
                  width: 50px;
                  height: 50px;
                  vertical-align: middle;
                  border-radius: 50%;
                  margin-left: 10px;
                  margin-right: 10px;
                "
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201803%2F18%2F20180318004321_pwzom.thumb.700_0.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664679186&t=bcd6eae69e52a4d3f3c94aa54cd1b830"
                alt=""
              />
            </span>
          </div>
        </div>
        <div style="margin-top: 15px">
          <el-input
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
            :autofocus="true"
            ref="serachBox"
          >
            <el-button
              :loading="loading"
              @keydown.enter.native="handleMsg"
              slot="append"
              type="primary"
              @click="handleMsg"
              >发送</el-button
            >
          </el-input>
        </div>
      </el-dialog>
	</div>
</template>

<script src="https://cdn.jsdelivr.net/npm/echarts@4.6.0/dist/echarts.simple.min.js"></script> 


<script>

if (typeof Vue == "undefined") {
  document.write(
    unescape(
      "%3Cscript src='vendor/vue.min.js' type='text/javascript'%3E%3C/script%3E"
    )
  );
}
if (typeof VueRouter == "undefined") {
  document.write(
    unescape(
      "%3Cscript src='vendor/vue-router.min.js' type='text/javascript'%3E%3C/script%3E"
    )
  );
}
if (typeof Vuex == "undefined") {
  document.write(
    unescape(
      "%3Cscript src='vendor/vuex.min.js' type='text/javascript'%3E%3C/script%3E"
    )
  );
}
if (typeof axios == "undefined") {
  document.write(
    unescape(
      "%3Cscript src='vendor/axios.min.js' type='text/javascript'%3E%3C/script%3E"
    )
  );
}
</script>
<!-- import JavaScript -->
<!-- <script src="https://unpkg.com/element-ui/lib/index.js"></script> -->
<script>
import UserAvatar from "../components/UserAvatar.vue";
export default{
  components: { UserAvatar },
	name: 'Machine',
  data: function() {
    return {
      avatar: "",
      visible: false,
      input3: "",
      list: [],
      loading: false,
    };
  },
  created: function() {
    this.visible11();
    document.addEventListener("keydown", (e) => {
      let key = window.event.keyCode;
      if (key == 13 && !this.loading) {
        // 13是enter键的键盘码 如果等于13 就调用click的登录方法
        this.handleMsg();
      }
    });
  },
  methods: {
    hisPurch() {
      this.$router.push("/home/user/userbuy").catch((err) => err);
    },
    hisQuestion(){
        this.$router.push("/home/user/expertQuestion").catch((err) => err); 
    },
    moreKnowledge(){
        this.$router.push("/home/guide").catch((err) => err);
    },
    aboutUs(){
        this.$router.push("/home/aboutUs").catch((err) => err);
    },
    redChili(){
      this.$router.push("/home/details?orderId=92").catch((err) => err);
    },
    bean(){
      this.$router.push("/home/knowledge/24").catch((err) => err);
    },
    pepino(){
      this.$router.push("/home/purchaseDetails?orderId=103").catch((err) => err);
    },
    visible11() {
      this.visible = true;
      this.$nextTick(() => {
        this.$refs.serachBox.focus();
      });
    },
    async handleMsg() {
      console.log(this.input3, "发送信息");
      if (this.input3 !== "") {
        this.loading = true;
        await this.list.push({
          align: "right",
          text: this.input3,
        });
        await this.scrollTop11();
        this.input3 = "";
        this.getMsg();
      }
    },
    getMsg() {
      setTimeout(async () => {
        let listMsg = {
          align: "left",
          text: "模拟信息返回",
          link: "",
        };
        await this.list.push(listMsg);
        await this.scrollTop11();
        this.loading = false;
      }, 1000);
    },
    // 处理滚动条一直保持最上方
    scrollTop11() {
      let div = document.getElementById("bigBox");
      div.scrollTop = div.scrollHeight;
    },
  },
}
</script>
<style lang="less" scoped>

div{
    box-sizing:content-box;
}

.msgCss {
  font-size: 16px;
  font-weight: 500;
}

.box-card {
  border: 1px solid rgb(231, 231, 231);
  min-width: 150px ;
  min-height: 30px ;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(242, 39, 12);
  height: 15px;
  padding: 8px 8px 8px 15px;
  font-weight: 700;
  border-bottom: 1px solid rgb(231, 231, 231);
}

.item div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15px;
  min-width: 150px;
  padding: 8px 8px 8px 15px;
}

.item div:hover {
      background-color: rgb(246, 248, 250);
    }
.item .t1 {
  border-bottom: 1px solid rgb(231, 231, 231);
}

.box-card .text {
  font-size: 14px;
}

.box-card-like {
    
    width: 300px;
     min-height: 30px;
   }

   .card-header-like {
     display: flex;
     padding: 8px 8px 8px 15px;
     justify-content: space-between;
     align-items: center;
     height: 15px;
     background-color: rgb(243,243,243);
     border: 1px solid rgb(231, 231, 231);
     border-radius: 5px;
   }

   .item-like span {
   display: inline-block;
    padding: 8px 4px 8px 6px;
    margin: 5px 2px;
     justify-content: space-between;
     align-items: center;
     color: rgb(242, 39, 12);
     height: 20px;
     width: 70px;
     border: 1px solid rgb(231, 231, 231);
     border-radius: 7px;
   }



</style>

