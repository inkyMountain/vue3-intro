const fetchTabs = () => {
  return new Promise<Array<{ id: number; name: string; }>>((resolve) => {
    setTimeout(() => {
      const tabs = [...new Array(10)].map((_, index) => {
        return {
          id: index,
          name: `tab${index}`,
        };
      });
      resolve(tabs);
    }, 500);
  });
};

export default fetchTabs;