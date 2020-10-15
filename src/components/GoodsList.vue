<template>
  <div class="goods-list">
    <template v-for="goods in goodsList" :key="goods.id">
      <!-- 在 v-for 的情况下，ref不再自动整合为一个数组，而是开发者提供一个函数，自行处理 dom 的去向。 -->
      <div class="goods" @click="onGoodsClick(goods)" :ref="(el) => goodsRefs.push(el)">
        {{ goods.name }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'GoodsList',

  props: {
    goodsList: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
  },

  setup(props, { emit, attrs, slots }) {
    const onGoodsClick = (goods: any) => {
      emit('goodsClick', goods)
    }

    const goodsRefs = ref<Array<HTMLDivElement>>([])
    const onWindowScroll = (event) => {
      goodsRefs.value.forEach((goodsRef) => {
        const { top } = goodsRef.getBoundingClientRect()
        const isInVision = top < window.innerHeight && top > 0
        if (isInVision) {
          // 埋点发送
        }
      })
    }
    onMounted(() => {
      window.addEventListener('scroll', onWindowScroll)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', onWindowScroll)
    })

    return {
      onGoodsClick,
      goodsRefs,
    }
  },
})
</script>

<style scoped lang="less">
</style>
