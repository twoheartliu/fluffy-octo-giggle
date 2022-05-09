<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>

    <!-- 如果 start 小于等于 1 则不显示 -->
    <button v-if="calcPage.start > 1" @click="$emit('getPageNo', 1)">1</button>
    <button v-if="calcPage.start > 2">···</button>

    <button
      v-for="page in calcList"
      :key="page"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="calcPage.end < totalPage - 1">···</button>
    <button
      v-if="calcPage.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <br />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage () {
      // 向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算连续页码起始数字与结束数字
    calcPage () {
      const { totalPage, pageNo, pageSize, continues } = this
      let start = 0
      let end = 0
      // 如果总页数 totalPage < continues
      if (totalPage < continues) {
        start = 1
        end = totalPage
      } else {
        // 正常情况 连续页面是 5 总页数大于等于 5
        // 6 7 8 9 10
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 不正常情况 start <= 0
        if (start < 1) {
          start = 1
          end = continues
        }
        // 不正常情况 end > totalPage
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return {
        start,
        end
      }
    },
    // 中间部分 list
    calcList () {
      const { calcPage, continues } = this
      const start = calcPage.start
      const arr = []
      for (let i = 0; i < continues; i++) {
        const j = start + i
        arr.push(j)
      }
      return arr
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>