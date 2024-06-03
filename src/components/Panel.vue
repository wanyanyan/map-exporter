<template>
  <div class="panel abs">
    <div class="head">
      <span>下载范围</span>
    </div>
    <div class="create-content">
      <div class="flex-between padding">
        <div class="label">经度：</div>
        <InputNumber v-model="params.lng" @on-blur="locationChange" :min="-180" :max="180" style="width:100%;"/>
      </div>
      <div class="flex-between padding">
        <div class="label">纬度：</div>
        <InputNumber v-model="params.lat" @on-blur="locationChange" :min="-80" :max="80" style="width:100%;"/>
      </div>
      <div class="flex-between padding">
        <div class="label">级别：</div>
        <InputNumber v-model="params.zoom" :max="19" :min="1" @on-blur="locationChange" style="width:100%;"/>
      </div>
      <div class="flex-between padding">
        <div class="label">宽度：</div>
        <InputNumber v-model="params.width" style="width:100%;"/>
      </div>
      <div class="flex-between padding">
        <div class="label">高度：</div>
        <InputNumber v-model="params.height" style="width:100%;"/>
      </div>
      <div class="flex-between padding">
        <div class="label">包含标注：</div>
        <Switch v-model="params.includeLabel" size="small"/>
      </div>
    </div>
    <div class="action tc">
      <Button type="primary" long @click="download">下载</Button>
    </div>
  </div>
  </template>
  
<script>
import mapboxgl from 'mapbox-gl'
import mapStyle from '@/constants/map_style'
import {nanoid} from 'nanoid'
import { useUIStore } from '@/stores'
export default {
  setup() {
    let uiStore = useUIStore()
    return {uiStore}
  },
  props: ['position'],
  methods: {
    locationChange() {
      this.$emit('on-change', this.params)
    },
    download() {
      let loadingId = nanoid()
      this.uiStore.loadingStart(loadingId, 'blocking')
      let div = document.createElement('div')
      div.style.width = `${this.params.width / window.devicePixelRatio}px`
      div.style.height = `${this.params.height / window.devicePixelRatio}px`
      div.style.position = 'absolute'
      div.style.zIndex = '-1'
      document.body.appendChild(div)
      let style = JSON.parse(JSON.stringify(mapStyle))
      style.sources['google-ADKfomZJne'].tiles = [`https://www.google.com/maps/vt?lyrs=${this.params.includeLabel?'y':'s'}@189&gl=en&x={x}&y={y}&z={z}`]
      const map = new mapboxgl.Map({
        container: div,
        style,
        bearing: 0,
        pitch: 0,
        center: [this.params.lng, this.params.lat],
        zoom: this.params.zoom,
        preserveDrawingBuffer: true
      })
      map.on('load', () => {
        try {
          let canvas = map.getCanvas()
          let base64 = canvas.toDataURL('image/jpeg') 
          let name = `${new Date().getTime()}.jpg`
          let a = document.createElement("a");
          a.href = base64
          a.download = name
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          this.uiStore.loadingStop(loadingId)
        } catch (err) {
          this.uiStore.loadingStop(loadingId)
        }
      })
    }
  },
  mounted () {
    if (this.position) {
      Object.assign(this.params, this.position)
    }
  },
  data () {
    return {
      params: {
        lng: 116.40,
        lat: 30.34,
        zoom: 18,
        width: 8000,
        height: 6000,
        includeLabel: false
      }
    }
  },
  watch: {
    position() {
      Object.assign(this.params, this.position)
    }
  }
}
</script>
  
  <style lang="less" scoped>
  .panel{
    left: 20px;
    top: 20px;
    background-color: #ffffff;
    .head{
      font-size: 16px;
      font-weight: bold;
      padding: 10px 20px;
      cursor: pointer;
    }
    .create-content{
      max-height: calc(100% - 90px);
      overflow: auto;
      .padding{
        padding: 10px 20px;
      }
      .label{
        width: fit-content;
        white-space: nowrap;
      }
    }
    .action{
      padding: 10px 20px;
    }
  }
  </style>