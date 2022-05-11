<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类 -->
            <li
              class="with-x"
              v-if="searchParams.categoryName"
              @click="removeCategory"
            >
              {{ searchParams.categoryName }}<i>×</i>
            </li>
            <!-- 关键字 -->
            <li
              class="with-x"
              v-if="searchParams.keyword"
              @click="removeKeyword"
            >
              {{ searchParams.keyword }}<i>×</i>
            </li>
            <!-- 品牌 -->
            <li
              class="with-x"
              v-if="searchParams.trademark"
              @click="removeTrademark"
            >
              {{ searchParams.trademark.split(":")[1] }}<i>×</i>
            </li>
            <!-- 属性 -->

            <li
              class="with-x"
              @click="removeProps(index)"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}<i>×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="combineActive">
                  <a @click="changeOrder('1')"
                    >综合
                    <span v-show="combineActive" :class="sortClass"></span>
                  </a>
                </li>
                <li :class="priceActive">
                  <a @click="changeOrder('2')"
                    >价格 <span v-show="priceActive" :class="sortClass"></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="i in goodsList" :key="i.id">
                <div class="list-wrap">
                  <div class="p-img" @click="goDetail(i.id)">
                    <a target="_blank"><img :src="i.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ Number.parseFloat(i.price).toFixed(2) }}</i>
                    </strong>
                  </div>
                  <div class="attr" @click="goDetail(i.id)">
                    <a target="_blank" :title="i.title" v-html="i.title"></a>
                  </div>
                  <div class="commit" @click="goDetail(i.id)">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'

export default {
  name: 'Search',
  components: {
    SearchSelector,
  },
  data () {
    return {
      searchParams: {
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        categoryName: undefined,
        keyword: undefined,
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: undefined
      }
    }
  },
  beforeMount () {
    // 将第二个参数开始的所有参数，结构赋值给第一个参数，将改变第一个参数的值
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapGetters('search', ['attrsList', 'goodsList', 'total']),
    combineActive () {
      return this.searchParams.order.includes('1') && 'active'
    },
    priceActive () {
      return this.searchParams.order.includes('2') && 'active'
    },
    sortClass () {
      return this.searchParams.order.includes('desc') ? 'iconfont icon-arrowdown' : 'iconfont icon-arrowup'
    },
  },
  methods: {
    getData () {
      this.$store.dispatch("search/postSearchList", this.searchParams)
      // 在发送请求后，将 categoryId 参数清空
      this.resetSearchParams()
    },
    removeCategory () {
      this.resetSearchParams()
      this.searchParams.categoryName = undefined
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    removeKeyword () {
      this.resetSearchParams()
      this.searchParams.keyword = undefined
      this.$router.push({ name: 'search', query: this.$route.query })
      // 发送事件，让 header 中的搜索框清除关键词
      this.$bus.$emit('clear')
    },
    removeTrademark () {
      this.resetSearchParams()
      this.searchParams.trademark = undefined
      this.$router.push({ name: 'search', query: this.$route.query, params: this.$route.params })
      this.getData()
    },
    resetSearchParams () {
      this.searchParams = {
        ...this.searchParams,
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
      }
    },
    removeProps (index) {
      // 删除当前点击的属性, splice 会改变原数组
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    trademarkInfo (trademark) {
      this.searchParams.trademark = `${trademark.tmId}: ${trademark.tmName}`
      this.getData()
    },
    attrInfo (prop) {
      if (!this.searchParams.props.includes(prop)) {
        this.searchParams.props.push(prop)
        this.getData()
      }
    },
    changeOrder (flag) {
      const originOrder = this.searchParams.order
      const originFlag = originOrder.split(':')[0]
      const originSort = originOrder.split(':')[1]

      let newOrder = ''
      // 与原来 flag 一致，判断原来 sort
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        // 与原来 flag 不一致，直接使用新 flag + 固定 desc
        newOrder = `${flag}:desc`
      }
      this.searchParams.order = newOrder
      this.getData()
    },
    // 自定义事件，获取当前在第几页
    getPageNo (pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData()
    },
    goDetail (skuId) {
      // 注意要传 params 参数必须给路由定义 name
      this.$router.push({
        name: 'detail',
        params: {
          skuId
        }
      })
    }
  },
  // 监听组件实例身上某个属性的值的变化
  watch: {
    // 监听路由信息的变化，如果变化，再次发起请求
    $route () {
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                cursor: pointer;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>