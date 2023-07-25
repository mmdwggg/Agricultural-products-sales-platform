<template>
	<div>
		  <!-- <el-button @click="visible11" type="primary">打开聊天框</el-button> -->
          <el-dialog :visible.sync="visible" title="对话框">
        <div style="height: 500px; overflow-y: auto" id="bigBox">
          <div
            v-for="(item, index) in list"
            class="msgCss"
            :style="{textAlign: item.align}"
          >
            <span v-if="item && item.align == 'left'">
              <img
                style="
                float: left;
                  width: 50px;
                  height: 50px;
                  /* vertical-align: middle; */
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

                    <div class="t1">在线问答</div>
                    <div class="t2">了解我们</div>
                  </div>
                </div></span
              >
              <span v-if="item && item.link"
                >: <a :href="item.link" target="_blank">{{item.text}}</a></span
              >
            </span>
            <span v-if="item && item.align == 'right'">
              {{item.text}}<img
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

<!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js"></script>-->
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
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
export default{
	name: 'Machine',
  data: function() {
    return {
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
      console.log("in");
      this.$router.push("/home/user/userbuy").catch((err) => err);
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
      // 处理自己的接口请求 返回需要的数据
      // axios
      //   .post("请求后端接口返回对话内容", { info: this.input3 })
      //   .then(async (response) => {
      //     console.log(response);
      //     if (response.status == 200) {

      //       // 自行处理需要的数据

      //       const msg = response.data;
      //       let listMsg = {
      //         align: "left",
      //         text: msg.answer,
      //         link: "",
      //       };
      //       if (msg.flag == 1) {
      //         const splitMsg = msg.answer.split("：");
      //         listMsg.text = splitMsg[0];
      //         listMsg.link = splitMsg[1];
      //       }
      //       await this.list.push(listMsg);
      //       await this.scrollTop11();
      //     }
      //     this.loading = false;
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //     this.loading = false;
      //   });

      /*
       * 模拟信息返回
       */
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
.msgCss {
  font-size: 16px;
  font-weight: 500;
}

.box-card {
  border: 1px solid rgb(231, 231, 231);
  padding: 0 10px 0 10px !important;
  min-width: 150px !important;
  min-height: 30px !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(242, 39, 12);
  height: 15px!important;
  padding: 8px!important;
  font-weight: 700;
  border-bottom: 1px solid rgb(231, 231, 231);
}

.item div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15px!important;
  padding: 8px!important;
}

.item .t1 {
  border-bottom: 1px solid rgb(231, 231, 231);
}

.box-card .text {
  font-size: 14px;
}
</style>

