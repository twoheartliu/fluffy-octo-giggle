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
  components: { Header, Footer }
}
</script>

<style>
</style>