<template>
  <!-- 可以在 v-model 后面加上参数，来对双向绑定的值进行重命名。 v-model:customPropName="selectedTabId" -->
  <!-- Vue3中，可以绑定多个 v-model，前提是 prop 名不冲突。 -->
  <!-- 其实质是将 Vue2 的 .sync 修饰符进行整合。 -->
  <Tabs :tabs="computedTabs" v-model="selectedTabId" :xxx="computedTabs" />
  <GoodsList :goodsList="computedGoodsList" />
  <!-- <Jsx :message="'message'" /> -->
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue';
import GoodsList from '@/components/GoodsList.vue';
import Tabs from '@/components/Tabs.vue';
import Jsx from '@/components/Jsx.tsx';
import fetchGoodsList from './interface/fetchGoodsList';
import fetchTabs from './interface/fetchTabs';

export default defineComponent({
  name: 'App',
  components: {
    Tabs,
    GoodsList,
    Jsx
  },

  // setup 中没有 this 供访问，也没有必要去访问 this。
  setup(props, context) {
    // attrs 和 props 区别：
    // props 为响应式，使用前先声明。
    // attrs 非响应式，所有传入的属性中，未被声明为 props 的属性，都在 attrs 中。
    const { emit, attrs, slots } = context;
    // 因为 Proxy API 的限制，reactive() 中只能传入数组和对象。
    // 慎用 es6 解构赋值 reactive，属性为基本类型时，会失去响应式。
    const tabs = reactive<
      Array<{
        id: number;
        name: string;
      }>
    >([]);
    // 如果需要令基本类型具备响应式，使用 ref() 来代替。
    // selectedTabId 形式为 {value: ''}，但是 Vue 很“贴心”地为你自动拆箱，模板中可以直接写 selectedTabId，而不是 selectedTabId.value。
    const selectedTabId = ref<string>('');
    const computedTabs = computed(() => {
      return tabs.map((tab) => {
        return {
          ...tab,
          title: tab.name,
        };
      });
    });
    // methods 可以直接用一个函数定义。
    const onTabClick = (tab: { title: string; id: string }) => {
      console.log('tab', tab);
      // 请求新 tab 的数据
    };

    /* ---------------------------------分割线以上是对 tab 栏的处理，以下是对商品列表的处理。----------------------------------- */
    // 与 tab 的处理类似，声明 data, computed, method.
    const goodsList = reactive<
      Array<{
        id: number;
        name: string;
      }>
    >([]);
    const computedGoodsList = computed(() => {
      return goodsList.map((goods) => {
        return {
          ...goods,
        };
      });
    });
    const onGoodsClick = (goods: { name: string; id: string }) => {
      console.log('goods', goods);
    };

    // 生命周期，在原有命名的基础上，统一加上了 "on" 前缀。
    // 但是没有 "onBeforeCreate" & "onCreated" !
    onMounted(async () => {
      const fetchedTabs = await fetchTabs();
      tabs.push(...fetchedTabs);

      const firstTab = fetchedTabs[0];
      const fetchedGoodsList = await fetchGoodsList({
        tabId: firstTab.id,
      });
      goodsList.push(...fetchedGoodsList);
    });


    watchEffect(
      () => {
        // 注意，如果使用 console.log(selectedTabId)，将无法触发这个 watchEffect。
        // console.log('selectedTabId.value', selectedTabId.value);
      },
      {
        // 在依赖成功收集的时候触发
        onTrack(event) {
          // console.log('on track event', event);
        },
        // 在触发变动时
        onTrigger(event) {
          // console.log('on trigger event', event);
        },
      }
    );

    /*
        watch(
          // 可以直接填入 selectedTabId 作为参数，也可以是一个函数。
          () => {
            return selectedTabId.value;
          },
          (newId, oldId) => {
            console.log("newId", newId);
            console.log("oldId", oldId);
          },
          {
            immediate: true,
            deep: true,
            // 与 watchEffect 类似，用于开发环境 debug。
            onTrack(event) {
              console.log('event', event);
            },
            onTrigger(event) {
              console.log('event', event);
            },
          }
        );
    */

    // ref 的坑点演示。如果ref被包了一层，就会没法自动拆箱。
    // const testRef = ref('testRef');
    // {{ testRef }}
    // {{ wrapper.testRef }}
    // wrapper: { testRef }

    return {
      tabs,
      computedTabs,
      onTabClick,
      selectedTabId,

      goodsList,
      computedGoodsList,
      onGoodsClick,
    };
  },

  beforeCreate() {
    // console.log('beforeCreate');
  },

  created() {
    // console.log('created');
  },
});

// 提取 hooks 以后的 setup。
/*
  setup(props) {
    const { goodsList, goodsAmount, fetchGoodsList, onGoodsClick } = useGoodsList()
    const { tabs, fetchTabs, onTabClick } = useTabs()

    onMounted(() => {
      fetchTabs()
        .then((fetchedTabs) => {
          tabs.push(...fetchedTabs)
          const firstTab = fetchedTabs[0]
          return firstTab ? fetchGoodsList(firstTab.id.toString()) : []
        })
        .then((fetchedGoodsList) => {
          goodsList.push(...fetchedGoodsList)
        })
    })

    return {
      goodsList,
      goodsAmount,
      fetchGoodsList,
      onGoodsClick,

      tabs,
      fetchTabs,
      onTabClick
    }
  }
  */
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
