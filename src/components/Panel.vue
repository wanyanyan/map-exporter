<template>
  <div class="panel abs">
    <div class="head">
      <span>下载范围</span>
    </div>
    <div class="create-content">
      <div class="flex-between padding">
        <div class="label">经度：</div>
        <InputNumber v-model="params.lng" style="width:100%;"/>
      </div>
      <div class="flex-between padding">
        <div class="label">纬度：</div>
        <InputNumber v-model="params.lat" style="width:100%;"/>
      </div>
      <div class="flex-between padding">
        <div class="label">级别：</div>
        <InputNumber v-model="params.zoom" :max="19" :min="1" style="width:100%;"/>
      </div>
      <div class="flex-between padding">
        <div class="label">宽度：</div>
        <InputNumber v-model="params.width" style="width:100%;"/>
      </div>
      <div class="flex-between padding">
        <div class="label">高度：</div>
        <InputNumber v-model="params.height" style="width:100%;"/>
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
    download() {
      let loadingId = nanoid()
      this.uiStore.loadingStart(loadingId, 'blocking')
      let div = document.createElement('div')
      div.style.width = `${this.params.width / window.devicePixelRatio}px`
      div.style.height = `${this.params.height / window.devicePixelRatio}px`
      div.style.position = 'absolute'
      div.style.zIndex = '-1'
      document.body.appendChild(div)
      const map = new mapboxgl.Map({
        container: div,
        style: mapStyle,
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
        width: 4000,
        height: 3000
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