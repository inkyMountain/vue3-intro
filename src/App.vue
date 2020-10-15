<template>
  <Tabs :tabs="computedTabs" v-model="selectedTabId" />
  <GoodsList :goodsList="computedGoodsList" />
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
} from "vue";
import GoodsList from "@/components/GoodsList.vue";
import Tabs from "@/components/Tabs.vue";
import fetchGoodsList from "./interface/fetchGoodsList";
import fetchTabs from "./interface/fetchTabs";

export default defineComponent({
  name: "App",
  components: {
    Tabs,
    GoodsList,
  },

  setup(props, { emit, attrs, slots }) {
    const tabs = reactive<Array<{ id: number; name: string }>>([]);
    const computedTabs = computed(() => {
      return tabs.map((tab) => {
        return {
          ...tab,
          title: tab.name,
        };
      });
    });
    const onTabClick = (tab: any) => {
      console.log("tab", tab);
    };
    const selectedTabId = ref("");

    const goodsList = reactive<Array<{ id: number; name: string }>>([]);
    const computedGoodsList = computed(() => {
      return goodsList.map((goods) => {
        return {
          ...goods,
        };
      });
    });
    const onGoodsClick = (goods: any) => {
      console.log("goods", goods);
    };

    watchEffect(
      () => {
        console.log("selectedTabId.value", selectedTabId.value);
      },
      {
        onTrack(event) {
          console.log("event", event);
        },
        onTrigger(event) {
          console.log("event", event);
        },
      }
    );
    // watch(
    //   () => {
    //     return selectedTabId.value;
    //   },
    //   (newId, oldId) => {
    //     console.log("newId", newId);
    //     console.log("oldId", oldId);
    //   },
    //   {
    //     immediate: true,
    //   }
    // );

    onMounted(async () => {
      const fetchedTabs = await fetchTabs();
      const firstTab = fetchedTabs[0];
      tabs.push(...fetchedTabs);

      const fetchedGoodsList = await fetchGoodsList({ tabId: firstTab.id });
      goodsList.push(...fetchedGoodsList);
    });

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

  // setup(props) {
  //   const { goodsList, goodsAmount, fetchGoodsList, onGoodsClick } = useGoodsList()
  //   const { tabs, fetchTabs, onTabClick } = useTabs()

  //   onMounted(() => {
  //     fetchTabs()
  //       .then((fetchedTabs) => {
  //         tabs.push(...fetchedTabs)
  //         const firstTab = fetchedTabs[0]
  //         return firstTab ? fetchGoodsList(firstTab.id.toString()) : []
  //       })
  //       .then((fetchedGoodsList) => {
  //         goodsList.push(...fetchedGoodsList)
  //       })
  //   })

  //   return {
  //     goodsList,
  //     goodsAmount,
  //     fetchGoodsList,
  //     onGoodsClick,

  //     tabs,
  //     fetchTabs,
  //     onTabClick
  //   }
  // },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
