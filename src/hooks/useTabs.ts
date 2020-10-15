import { reactive } from "vue"

const useTabs = () => {
  const fetchTabs = () => {
    return new Promise<Array<{ id: number; name: string }>>((resolve) => {
      setTimeout(() => {
        const tabs = [...new Array(10)].map((_, index) => {
          return {
            id: index,
            name: `tab${index}`,
          }
        })
        resolve(tabs)
      }, 1000)
    })
  }

  const tabs = reactive<Array<{ id: number; name: string }>>([])

  const onTabClick = (tabId: string) => {
    console.log('tabId', tabId)
  }

  return {
    fetchTabs,
    tabs,
    onTabClick
  }
}

export default useTabs
