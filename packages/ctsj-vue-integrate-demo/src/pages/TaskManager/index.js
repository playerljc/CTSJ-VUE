import { v1 } from 'uuid';

import styles from './index.less';

/**
 * TaskManager
 */
export default {
  data() {
    return {
      columns: [
        {
          key: 'number',
          dataIndex: 'number',
          title: '序号',
          renderSlot: 'number',
        },
        {
          key: 'name',
          dataIndex: 'name',
          title: '任务名称',
        },
        {
          key: 'createUser',
          dataIndex: 'createUser',
          title: '创建人',
        },
        {
          key: 'status',
          dataIndex: 'status',
          title: '任务状态',
        },
        {
          key: 'describe',
          dataIndex: 'describe',
          title: '描述',
        },
        {
          key: 'createTime',
          dataIndex: 'createTime',
          title: '创建时间',
        },
        {
          key: 'option',
          dataIndex: 'option',
          title: '操作',
          renderSlot: 'option',
        },
      ],
      dataSource: [
        {
          id: v1(),
          name: '任务1',
          createUser: 'admin',
          status: '已接收',
          describe: '任务1',
          createTime: '2010-10-12',
        },
        {
          id: v1(),
          name: '任务2',
          createUser: 'admin',
          status: '已完成',
          describe: '任务2',
          createTime: '2010-10-15',
        },
        {
          id: v1(),
          name: '任务3',
          createUser: 'admin',
          status: '进行中',
          describe: '任务3',
          createTime: '2010-10-16',
        },
      ],
      rowKey: 'id',
      loading: true,
    };
  },
  template: `
    <v-spin class="${styles.Wrap}" v-bind:spinning="loading"> 
      <search-table-layout>
        <!--   查询面板     -->
        <template v-slot:search>
          <div class="${styles.SearchForm}">
            <table >
              <tbody>
                <tr>
                  <td>名称：</td>
                  <td><input type="text" /></td>
                  
                  <td>状态：</td>
                  <td>
                    <select>
                      <option 
                        v-for="item in statusSelectList" 
                        v-bind:key="item.value"
                        v-bind:value="item.value">{{item.label}}</option>
                    </select>
                  </td>
                  
                  <td>创建时间：</td>
                  <td><input type="datetime-local" /></td>
                </tr>
                
                <tr>
                  <td>创建人：</td>
                  <td>
                    <select>
                      <option 
                        v-for="item in userSelectList" 
                        v-bind:key="item.value"
                        v-bind:value="item.value">{{item.label}}</option>
                    </select>
                  </td>
                  
                  <td></td>
                  <td></td>
                  
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div class="${styles.Footer}">
               <v-button class="${styles.FooterItem}">重置</v-button>
               <v-button class="${styles.FooterItem}" primary>查询</v-button>
            </div>
          </div>
        </template>
        
        <!--   表格的标题   -->
        <template v-slot:title>
          <div>任务表格</div>
        </template>
        
        <!--   表格右侧面板   -->
        <template v-slot:extra>
          <div>
            <v-button primary>新建</v-button>
          </div>
        </template>
        
        <!--  表格  -->
        <template v-slot:table>
          <v-table 
            v-bind:columns="columns" 
            v-bind:data-source="dataSource" 
            row-key="id">
            <template v-slot:option>
              <div class="${styles.OptionWrap}">
                <a>编辑</a><span>|</span>
                <a>查看</a><span>|</span>
                <a>删除</a>
              </div>
            </template>
            <template v-slot:number="slotProps">
              <span>{{slotProps.rowindex + 1}}</span>
            </template>
          </v-table>
        </template>
      </search-table-layout>
    </v-spin>
  `,
  computed: {
    statusSelectList() {
      return [
        {
          label: '全部',
          value: -1,
        },
        {
          label: '未接收',
          value: 1,
        },
        {
          label: '已接收',
          value: 2,
        },
        {
          label: '进行中',
          value: 3,
        },
        {
          label: '已完成',
          value: 4,
        },
      ];
    },
    userSelectList() {
      return [
        {
          label: '全部',
          value: -1,
        },
        {
          label: '张三',
          value: 1,
        },
        {
          label: '李四',
          value: 2,
        },
        {
          label: '王五',
          value: 3,
        },
        {
          label: '赵刘',
          value: 4,
        },
      ];
    },
  },
  mounted() {
    setTimeout(
      this.$createAsyncExecContext(() => {
        this.loading = false;
      }),
      4000,
    );
  },
};
