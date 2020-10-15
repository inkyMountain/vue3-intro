import { reactive, computed, watch, onMounted } from "vue";

const useGoodsList = () => {
  const fetchGoodsList = (tabId: string) => {
    return new Promise<Array<{ id: number; name: string; }>>((resolve) => {
      setTimeout(() => {
        const goodsList = [...new Array(10)].map((_, index) => {
          return {
            id: index,
            name: `Goods${index}`,
          };
        });
        resolve(goodsList);
      }, 1000);
    });
  };

  const onClickGoods = () => {

  };

  const goodsList = reactive<Array<{ id: number; name: string; }>>([]);

  const goodsAmount = computed(() => goodsList.length);

  watch(
    () => goodsList,
    (list, oldList) => {
      console.log("goodsList change");
    },
    {
      immediate: true,
    }
  );

  return {
    goodsList,
    goodsAmount,
    fetchGoodsList,
    onClickGoods
  };
};

export default useGoodsList;
