<template>
  <div class="mch-loading" v-show="show">
    <LoadingCircle :fixed="true" width="40" height="40" >
      <slot></slot>
    </LoadingCircle>
  </div>
</template>
<script>
import LoadingCircle from './LoadingCircle.vue'
export default {
  components: {
    LoadingCircle
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="less">
.mch-loading{
  z-index: 9999 !important;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .ivu-spin-fix {
    background-color: rgba(45, 45, 45, 0.9);
  }
  .mch-loading-path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }
  .mch-loading-circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .mch-loading-loader {
    position: relative;
    margin: 0 auto;
  }
}
@keyframes color {
  0%,
  100% {
    stroke: #d62d20;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@keyframes rotate {
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
</style>
