import Vue from '@ctsj/vue';

export default {
  render(id, el) {
    const ins = new Vue({
      el,
      template: `
        <div>
          <dl>
            <dt>class - 方式1</dt>
            <dd>
               <table>
                 <tr>
                  <th>序号</th>
                  <th>姓名</th>
                  <th>性别</th>
                  <th>出生年月</th>
                  <th>籍贯</th>
                 </tr>

               </table>
            </dd>
          </dl>

          <dl>
            <dt>class - 方式2</dt>
            <dd>
               
            </dd>
          </dl>
        </div>
      `,
      data: () => ({
        
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
