<template>
  <div class="tabs">
    <template v-for="tab in tabs" :key="tab.id">
      <span class="tab" @click="onTabClick(tab)">
        {{ tab.title }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Tabs',

  props: {
    tabs: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },

    modelValue: {
      type: String,
      required: false
    },
  },
  
  setup(props, {emit, attrs, slots}) {
    const onTabClick = (tab: any) => {
      emit('update:modelValue', tab.id)
    }

    return {
      onTabClick
    }
  }
});
</script>

<style scoped lang="less">

</style>
