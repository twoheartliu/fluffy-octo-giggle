<template>
  <div class="spec-preview">
    <img :src="skuImageList[index].imgUrl" ref="img" />
    <!-- 鼠标移动事件 -->
    <div class="event" @mousemove="mousemoveHandler"></div>
    <div class="big">
      <img :src="skuImageList[index].imgUrl" ref="big" />
    </div>
    <!-- 遮罩 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ['skuImageList'],
  data () {
    return {
      index: 0
    }
  },
  mounted () {
    // 从 $bus 全局事件总线中捕获事件
    this.$bus.$on('getCurrentIndex', (index) => {
      this.index = index
    })
  },
  methods: {
    mousemoveHandler (event) {
      const { mask, img, big } = this.$refs
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2

      if (left < 0) left = 0
      if (top < 0) top = 0

      if (left + mask.offsetWidth > img.offsetWidth) left = img.offsetWidth - mask.offsetWidth
      if (top + mask.offsetHeight > img.offsetHeight) top = img.offsetHeight - mask.offsetHeight

      mask.style.left = left + 'px'
      mask.style.top = top + 'px'

      big.style.left = left * -2 + 'px'
      big.style.top = top * -2 + 'px'
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>