<template>
  <div id="wx-nav">
    <nav>
      <router-link to="/" tag="dl" exact>
        <dt class="iconfont icon-wechat" >
        </dt>
        <dd>职涯解惑</dd>
      </router-link>
      <router-link to="/explore" tag="dl">
        <dt class="iconfont icon-find" >
        </dt>
        <dd>职涯专家</dd>
      </router-link>
      <router-link to="/self" tag="dl">
        <dt class="iconfont icon-me" >
        </dt>
        <dd>我的职涯</dd>
      </router-link>
    </nav>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    mounted() {
      for (var i in this.$store.state.msgList.baseMsg) {
        if (this.$store.state.msgList.baseMsg[i].read === false && this.$store.state.msgList.baseMsg[i].quiet === false) {
              this.$store.commit('addNewMsg')
        }
      }
    }
  }
</script>
<style>
  @import "../../assets/css/wx-nav.css";
</style>