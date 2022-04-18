<template>
  <div>
    search page
    <div>
      <h1>获取到的 params 是： {{ $route.params.keyword }}</h1>
      <h1>获取到的 query 是： {{ $route.query.k }}</h1>
      <h1>通过 props 获取到的 params 是： {{ keyword }}</h1>
      <h1>通过 props 获取到的 query 是： {{ $attrs.k }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ["keyword"]
}
</script>

<style>
</style>