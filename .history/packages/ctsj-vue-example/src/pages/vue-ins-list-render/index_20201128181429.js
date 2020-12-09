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
                  <tr v-for="(todo,index) in list1">
                    <td>{{index + 1}}</td>
                    <td>{{todo.name}}</td>
                    <td>{{todo.sex}}</td>
                    <td>{{todo.birthday}}</td>
                    <td>{{todo.jg}}</td>
                  </tr>
                 </tbody>
               </table>
            </dd>
          </dl>

          <!--
          <dl>
            <dt><h3>列表</h3></dt>
            <dd>
               <ul>
                 <li v-for="(item, index) of list2">
                   <div>
                    <img src="{{item.icon}}"/>
                   </div>
                   <div>
                    <div>{{item.title}}</div>
                    <div>{{item.subTitle}}</div>
                    <div>{{item.time}}</div>
                   </div>
                 </li>
               </ul>
            </dd>
          </dl>
          -->
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
        debugger
        console.log(this.list1);
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
