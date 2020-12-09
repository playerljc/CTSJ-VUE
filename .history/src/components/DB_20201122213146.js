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
    localStorage.setItem('todolist', JSON.stringify(data));
  },
};
