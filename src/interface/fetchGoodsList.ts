const fetchGoodsList = ({ tabId }: { tabId: number; }) => {
  return new Promise<Array<{ id: number; name: string; }>>((resolve) => {
    setTimeout(() => {
      const goodsList = [...new Array(10)].map((_, index) => {
        return {
          id: index,
          name: `Goods${index}`,
        };
      });
      resolve(goodsList);
    }, 500);
  });
};

export default fetchGoodsList;
