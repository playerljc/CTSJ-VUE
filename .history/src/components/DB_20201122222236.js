export default {
  getData() {
    const data = localStorage.getItem('todolist');
    if (!data) {
      return {
        processingList: [],
        completedList: [],
      };
    }

    return JSON.parse(data);
  },
  save(data) {
    localStorage.setItem('todolist', JSON.stringify({
      processingList: data.processingList.map((t) => ({
        id: t.id,
        info: t.info,
        active: false,
      }),
      completedList: data.completedList.map((t) => ({
        id: t.id,
        info: t.info,
        active: false,
      }),
    }));
  },
};
