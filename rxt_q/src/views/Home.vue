<template>
  <div class="home-content">
    <navigation-bar></navigation-bar>
    <router-view></router-view>
     <div style=" position: fixed;bottom:260px;margin-left:1568px">
        <img v-if="btnFlag"  width="50px" height="50px" src='../assets/backtop.png' @click="backTop">
      </div>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
export default {
  name: "Home",
  data() {
    return {
       btnFlag:false
    };
  },
  components: {
    NavigationBar,
  },
  methods:{
    backTop () {
            const that = this
            let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                if (that.scrollTop === 0) {
                clearInterval(timer)
                }
            }, 16)
        },
        
        // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
        scrollToTop () {
            const that = this
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            that.scrollTop = scrollTop
            if (that.scrollTop > 60) {
            that.btnFlag = true
            } else {
            that.btnFlag = false
            }
        }
  },
   mounted(){

       window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
         window.removeEventListener('scroll', this.scrollToTop)
        }
};
</script>

<style lang="less" scoped> 
.home-content{
  width: 100%;
  height: 100%;
}
</style>