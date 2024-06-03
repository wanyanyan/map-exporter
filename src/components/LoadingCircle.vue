<template>
  <Spin :fix="fixed" class="mch-loading-circle">
    <div class="mch-loading-loader" :style="`width:${width||30}px;height:${height||30}px;`">
      <svg class="mch-loading-circular" viewBox="25 25 50 50">
        <circle
          class="mch-loading-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="5"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
    <slot></slot>
  </Spin>
</template>

<script>
export default {
  props: ['fixed', 'width', 'height']
}
</script>
