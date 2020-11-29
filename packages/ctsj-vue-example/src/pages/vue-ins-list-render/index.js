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
                  <tr v-for="(item , index) in list1">
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
          
          <dl>
            <dt><h3>列表</h3></dt>
            <dd>
               <ul>
                 <li v-for="(item , index) of list2">
                   <div>
                    <img v-bind:src="item.icon"/>
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

          <dl>
            <dt><h3>列表嵌套</h3></dt>
            <dd>
              <ul>
                <li v-for="(item , index) of list3">
                  <div>
                    <span>{{index + 1}}.</span>
                    <span>{{item.title}}</span>
                  </div>
                  <ul>
                    <li v-for="(item1, index1) of item.list">
                      <span>{{index + 1}}-{{index1 + 1}}.</span>
                      <span>{{item1.title}}</span>
                    </li>
                  </ul>
                </li>
              </ul>
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
            jg: 'shenyang',
          },
          {
            name: 'playerljc2',
            sex: '女',
            birthday: 'xxxx-xx-xx',
            jg: 'shenyang',
          },
          {
            name: 'playerljc3',
            sex: '男',
            birthday: 'xxxx-xx-xx',
            jg: 'shenyang',
          },
        ],
        list2: [
          {
            icon:
              'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3922290090,3177876335&fm=26&gp=0.jpg',
            title: 'xxxxxxxxxx',
            subTitle: 'xxxxx',
            time: 'xxxx-xx-xx',
          },
          {
            icon:
              'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3922290090,3177876335&fm=26&gp=0.jpg',
            title: 'xxxxxxxxxx',
            subTitle: 'xxxxx',
            time: 'xxxx-xx-xx',
          },
          {
            icon:
              'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3922290090,3177876335&fm=26&gp=0.jpg',
            title: 'xxxxxxxxxx',
            subTitle: 'xxxxx',
            time: 'xxxx-xx-xx',
          },
        ],
        list3: [
          {
            title: 'xxx',
            list: [
              {
                title: 'xxx',
              },
              {
                title: 'xxx',
              },
              {
                title: 'xxx',
              },
              {
                title: 'xxx',
              },
            ],
          },
          {
            title: 'xxx',
            list: [
              {
                title: 'xxx',
              },
              {
                title: 'xxx',
              },
              {
                title: 'xxx',
              },
              {
                title: 'xxx',
              },
            ],
          },
          {
            title: 'xxx',
            list: [
              {
                title: 'xxx',
              },
              {
                title: 'xxx',
              },
              {
                title: 'xxx',
              },
              {
                title: 'xxx',
              },
            ],
          },
        ],
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
