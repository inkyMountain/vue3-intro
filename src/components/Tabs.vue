<template>
  <div class="tabs">
    {{ selectedTabId }}
    <!-- key需要写在 template 上。 -->
    <template v-for="tab in tabs" :key="tab.id">
      <div class="tab" @click="onTabClick(tab)">
        {{ tab.title }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, toRefs, watch, watchEffect } from 'vue';

export default defineComponent({
  name: 'Tabs',

  props: {
    tabs: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },

    // 如果 v-model 后面加参数的话，modelValue需要改成对应的参数。
    modelValue: {
      type: String,
      required: false,
    },
  },

  setup(
    props: { tabs: Array<{ title: string; id: string }>; modelValue: string },
    { emit, attrs, slots }
  ) {
    const onTabClick = (tab: any) => {
      // 如果 v-model 后面加参数的话，modelValue需要改成对应的参数。
      emit('update:modelValue', tab.id);
    };

    // const { modelValue: selectedTabId } = props;

    watchEffect(() => {
      // console.log('props', props.modelValue);
    });

    return {
      onTabClick,
      // selectedTabId,
    };
  },
});
</script>

<style scoped lang="less">
.tabs {
  overflow-x: auto;
  display: flex;
  &::-webkit-scrollbar {
    display: none;
  }
  .tab {
    padding: 10px;
    color: white;
    background-color: lightskyblue;
  }
}
</style>
