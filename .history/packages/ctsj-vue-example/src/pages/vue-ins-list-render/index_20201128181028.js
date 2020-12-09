import Vue from '@ctsj/vue';

export default {
  render(id, el) {
    const ins = new Vue({
      el,
      template: `
        <div>
          <dl>
            <dt><h3>表格</h3></dt>
            <dd>
               <table>
                 <thead>
                  <tr>
                    <th>序号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>出生年月</th>
                    <th>籍贯</th>
                  </tr>
                 </thead>

                 <tbody>
                  <tr v-for="(item, index) in list1">
                    <td>{{index + 1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.sex}}</td>
                    <td>{{item.birthday}}</td>
                    <td>{{item.jg}}</td>
                  </tr>
                 </tbody>
               </table>
            </dd>
          </dl>

          
        </div>
      `,
      data: () => ({
        list1: [
          {
            name: 'playerljc1',
            sex: '男',
            birthday: 'xxxx-xx-xx',
            jg:'shenyang'
          }
        ],
        list2: [],
      }),
      methods: {},
      computed: {},
      watch: {},
      beforeCreate() {
        console.log(id, 'beforeCreate');
      },
      created() {
        console.log(id, 'created');
      },
      beforeMount() {
        console.log(id, 'beforeMount');
      },
      mounted() {
        console.log(id, 'mounted');
      },
      beforeUpdate() {
        console.log(id, 'beforeUpdate');
      },
      updated() {
        console.log(id, 'updated');
      },
      beforeDestroy() {
        console.log(id, 'beforeDestroy');
      },
      destroyed() {
        console.log(id, 'destroyed');
      },
    });
  },
};
