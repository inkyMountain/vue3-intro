<template>
  <div class="goods-list">
    <template v-for="goods in goodsList" :key="goods.id">
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
