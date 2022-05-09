<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="this.$route.meta.isFooterShow" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: { Header, Footer },
  mounted () {
    // 通知 vuex 发请求,获取数据,存储于 store 中
    this.$store.dispatch("home/categoryList")
  },
}
</script>

<style>
</style>