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
    const a = _.cloneDeep(data.processingList));
    
    const b = _.cloneDeep(data.completedList).map((t) => ({
      id: t.id,
      info: t.info,
      active: false,
    }));

    localStorage.setItem('todolist', JSON.stringify({
      processingList: data.processingList..map((t) => ({
        id: t.id,
        info: t.info,
        active: false,
      }),
      
    }));
  },
};
