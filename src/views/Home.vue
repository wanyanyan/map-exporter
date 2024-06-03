<template>
  <div class="full">
    <div id="before-container" class="full abs" @contextmenu.stop.prevent></div>
    <div class="meta abs">经度：{{ position.lng || '-' }}  纬度：{{ position.lat || '-' }}  级别：{{ position.zoom || '-' }}</div>
    <Panel :position="position"/>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import elementResizeDetectorMaker from 'element-resize-detector'
import mapStyle from '@/constants/map_style'
import Panel from '@/components/Panel.vue'

mapboxgl.accessToken =
  'pk.eyJ1Ijoid2FueWFueWFuIiwiYSI6Im1uNVZnTncifQ.90XY40_yjpItUHO8HnbbpA'

export default {
  setup () {
  },
  components: {
    Panel
  },
  methods: {
    mapClick (e) { // 地图点击照片位置显示照片信息
      
    },
    mapMouseMove (e) { // 修改指针，表示要素可点击
      let center = this.map.getCenter()
      this.position = {
        lng: center.lng,
        lat: center.lat,
        zoom: this.map.getZoom()
      }
    }
  },
  mounted () {
    this.map = new mapboxgl.Map({
      container: 'before-container',
      style: mapStyle,
      bearing: 0,
      pitch: 0,
      center: [114.35825060, 30.5287076],
      zoom: 16,
      doubleClickZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
      preserveDrawingBuffer: true
    })
    this.map.on('load', () => {
      this.map.on('click', this.mapClick)
      this.map.on('moveend', this.mapMouseMove)
      let center = this.map.getCenter()
      this.position = {
        lng: center.lng,
        lat: center.lat,
        zoom: this.map.getZoom()
      }
    })
    var erd = elementResizeDetectorMaker()
    erd.listenTo(this.$el, () => {
      this.map.resize()
    })
  },
  beforeUnmount () {
    this.map.remove()
    this.map = null
  },
  data () {
    return {
      position: {}
    }
  }
}
</script>

<style lang="less" scoped>
#before-container{
  background-color: #000000;
}
.meta{
  width: 100%;
  padding-left: 10px;
  background-color: #212121;
  line-height: 24px;
  bottom: 0;
  font-size: 12px;
  color: #ffffff;
}
.actions{
  right: 20px;
  top: 20px;
}
.camera-btn{
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background-color: #424242;
  margin-left: 10px;
  &.selected{
    background-color: #035083;
  }
}
</style>
