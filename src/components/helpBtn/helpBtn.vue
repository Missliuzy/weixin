<docs>
  ## 帮助按钮组件
</docs>
<template>
<ul>
  <li class="return">
    <a href="http://rsj.beijing.gov.cn/mplatform/service/list.ht">
      <img src="../../common/images/return.png" alt="">
    </a>
  </li>
</ul>
</template>
<script>
export default {
  name: 'helpBtn'
};
</script>
<style scoped lang="scss">
ul {
  position: fixed;
  z-index: 100;
  right: 48px;
  top: 8%;
  width: 100px;
  li {
    list-style:none;
    width: 100px;
    height: 100px;
    text-align: center;
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
