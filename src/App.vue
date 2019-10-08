<template>
  <div id="app">
    <transition name="route">
      <router-view />
    </transition>
    <bar></bar>
  </div>
</template>

<script>
// import Loading from '@/base/loading/loading';
import Bar from 'base/bar/bar';

export default {
  name: 'App',
  components: { Bar },
  methods: {
    async GET_personInfo() {
      const res = await this.$http.get('/grgl/sfyqzdj');
      const userInfo = res.returnData.grjbxx;
      this.$store.commit('SET_USER_INFO', {
        name: userInfo.xm,
        sfzhm: userInfo.sfzhm,
        grbh: userInfo.grbh
      });
    }
  },
  created() {
    this.GET_personInfo();
  }
};
</script>

<style lang="scss" scoped>
  @import '~common/scss/var.scss';
  .route-enter {
    opacity: 0.2;
    // transform: translate3d(0, 0, 0);
  }
  .route-enter-active {
    transition: $transitionFast;
  }
  .route-leave-active {
    transition: $transitionFast;
  }
  .route-leave-to {
    // transform: translateY(50px);
    transform: translate3d(0, 150px, 0);
    opacity: 0;
  }
</style>

