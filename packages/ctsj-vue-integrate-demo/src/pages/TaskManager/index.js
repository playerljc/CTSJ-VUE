import { v1 } from 'uuid';

import styles from './index.less';

let delId;

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
          renderSlot: 'user-select',
        },
        {
          key: 'status',
          dataIndex: 'status',
          title: '任务状态',
          renderSlot: 'status-select',
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
      dataSource: [],
      rowKey: 'id',
      loading: true,
      visibleNewModal: false,
      visibleEditModal: false,
      visibleViewModal: false,
      visibleDeleteConfirm: false,

      editRecord: null,
      viewRecord: null,
      newRecord: {
        name: '',
        createUser: '',
        status: '',
        describe: '',
        createTime: '',
      },
      searchRecord: {
        name: '',
        describe: '',
        createUser: '-1',
        status: '-1',
        createTime: '',
      },
    };
  },
  template: `
    <v-spin class="${styles.Wrap}" v-bind:spinning="loading"> 
      <search-table-layout>
        <!--   查询面板     -->
        <template v-slot:search>
          <div class="${styles.SearchForm}">
            <table>
              <tbody>
                <tr>
                  <td>任务名称：</td>
                  <td><input type="text" v-model="searchRecord.name"/></td>
                  
                  <td>任务状态：</td>
                  <td>
                    <select v-model="searchRecord.status">
                      <option 
                        v-for="item in statusSelectList" 
                        v-bind:key="item.value"
                        v-bind:value="item.value">{{item.label}}</option>
                    </select>
                  </td>
                  
                  <td>创建时间：</td>
                  <td><input type="datetime" v-model="searchRecord.createTime"/></td>
                </tr>
                
                <tr>
                  <td>创建人：</td>
                  <td>
                    <select v-model="searchRecord.createUser">
                      <option 
                        v-for="item in userSelectList" 
                        v-bind:key="item.value"
                        v-bind:value="item.value">{{item.label}}</option>
                    </select>
                  </td>
                  
                  <td>任务描述：</td>
                  <td><input type="text" v-model="searchRecord.describe"/></td>
                  
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div class="${styles.Footer}">
               <v-button class="${styles.FooterItem}" v-on:click="onReset">重置</v-button>
               <v-button class="${styles.FooterItem}" primary v-on:click="onSearch">查询</v-button>
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
            <v-button primary v-on:click="onNew">新建</v-button>
          </div>
        </template>
        
        <!--  表格  -->
        <template v-slot:table>
          <v-table 
            v-bind:columns="columns" 
            v-bind:data-source="tableData" 
            row-key="id">
            <template v-slot:option="slotProps">
              <div class="${styles.OptionWrap}">
                <a v-on:click="onEdit(slotProps.record,$event)">编辑</a><span>|</span>
                <a v-on:click="onView(slotProps.record,$event)">查看</a><span>|</span>
                <a v-on:click="onDelete(slotProps.record.id,$event)">删除</a>
              </div>
            </template>
            <template v-slot:number="slotProps">
              <span>{{slotProps.rowindex + 1}}</span>
            </template>
            <template v-slot:user-select="slotProps">
              <span>{{getUserLabel(slotProps.record.createUser)}}</span>
            </template>
            <template v-slot:status-select="slotProps">
              <span>{{getStateLabel(slotProps.record.status)}}</span>
            </template>
          </v-table>
        </template>
      </search-table-layout>
      
      <!--  新建任务   -->
      <v-modal 
        title="新建" 
        v-bind:visible="visibleNewModal" 
        v-on:onCancel="visibleNewModal = false"
        v-on:onOk="onNewOk" 
        >
        <div class="${styles.InputForm}">
          <table>
            <tbody>
              <tr>
                <td>任务名称：</td>
                <td><input type="text" v-model="newRecord.name"/></td>
              </tr>
              <tr>
                <td>创建人：</td>
                <td>
                  <select v-model="newRecord.createUser">
                    <option 
                      v-for="item in userSelectList" 
                      v-bind:key="item.value"
                      v-bind:value="item.value">{{item.label}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>任务状态：</td>
                <td>
                  <select v-model="newRecord.status">
                    <option 
                      v-for="item in statusSelectList" 
                      v-bind:key="item.value"
                      v-bind:value="item.value">{{item.label}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>任务描述：</td>
                <td><textarea v-model="newRecord.describe"></textarea></td>
              </tr>
              <tr>
                <td>创建时间：</td>
                <td><input type="datetime" v-model="newRecord.createTime" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-modal>
      
      <!--  编辑任务   -->
      <v-modal 
        title="编辑" 
        v-bind:visible="visibleEditModal" 
        v-on:onCancel="visibleEditModal = false"
        v-on:onOk="onEditOk" 
        >
        <div class="${styles.InputForm}">
          <table>
            <tbody>
              <tr>
                <td>任务名称：</td>
                <td><input type="text" v-model="editRecord.name"/></td>
              </tr>
              <tr>
                <td>创建人：</td>
                <td>
                  <select v-model="editRecord.createUser">
                    <option 
                      v-for="item in userSelectList" 
                      v-bind:key="item.value"
                      v-bind:value="item.value">{{item.label}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>任务状态：</td>
                <td>
                  <select v-model="editRecord.status">
                    <option 
                      v-for="item in statusSelectList" 
                      v-bind:key="item.value"
                      v-bind:value="item.value">{{item.label}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>任务描述：</td>
                <td><textarea v-model="editRecord.describe"></textarea></td>
              </tr>
              <tr>
                <td>任务描述：</td>
                <td><input type="datetime" v-model="editRecord.createTime" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-modal>
      
      <!--  查看任务   -->
      <v-modal 
        title="查看" 
        v-bind:visible="visibleViewModal" 
        v-on:onCancel="visibleViewModal = false"
        v-on:onOk="onViewOk" 
        >
        <div class="${styles.InputForm}">
          <table>
            <tbody>
              <tr>
                <td>任务名称：</td>
                <td>{{viewRecord.name}}</td>
              </tr>
              <tr>
                <td>创建人：</td>
                <td>
                  {{statusLabel}}
                </td>
              </tr>
              <tr>
                <td>任务状态：</td>
                <td>
                  {{createUserLabel}}
                </td>
              </tr>
              <tr>
                <td>任务描述：</td>
                <td>{{viewRecord.describe}}</td>
              </tr>
              <tr>
                <td>任务描述：</td>
                <td>{{viewRecord.createTime}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-modal>
      
      <!--  删除确认   -->
      <v-delete-confirm
        v-bind:visible="visibleDeleteConfirm" 
        v-on:onCancel="visibleDeleteConfirm = false"
        v-on:onOk="onDeleteConfirmOk" 
      ></v-delete-confirm>
      
    </v-spin>
  `,
  computed: {
    tableData() {
      const { name, describe, createUser, status, createTime } = this.searchRecord;
      return this.dataSource
        .filter((record) => {
          if (name) {
            return record.name.indexOf(name) !== '-1';
          }

          return true;
        })
        .filter((record) => {
          if (describe) {
            return record.describe.indexOf(describe) !== '-1';
          }

          return true;
        })
        .filter((record) => {
          if (createUser !== '-1') {
            return record.createUser === createUser;
          }

          return true;
        })
        .filter((record) => {
          if (status !== '-1') {
            return record.status === status;
          }

          return true;
        })
        .filter((record) => {
          if (createTime) {
            return record.createTime.indexOf(createTime) !== '-1';
          }

          return true;
        });
    },
    statusSelectList() {
      return [
        {
          label: '全部',
          value: '-1',
        },
        {
          label: '未接收',
          value: '1',
        },
        {
          label: '已接收',
          value: '2',
        },
        {
          label: '进行中',
          value: '3',
        },
        {
          label: '已完成',
          value: '4',
        },
      ];
    },
    userSelectList() {
      return [
        {
          label: '全部',
          value: '-1',
        },
        {
          label: '张三',
          value: '1',
        },
        {
          label: '李四',
          value: '2',
        },
        {
          label: '王五',
          value: '3',
        },
        {
          label: '赵刘',
          value: '4',
        },
      ];
    },
    statusLabel() {
      if (this.viewRecord) {
        return this.statusSelectList.find((t) => t.value === this.viewRecord.status).label;
      }

      return '';
    },
    createUserLabel() {
      if (this.viewRecord) {
        return this.userSelectList.find((t) => t.value === this.viewRecord.createUser).label;
      }

      return '';
    },
  },
  methods: {
    onSearch() {
      this.loading = true;

      setTimeout(
        this.$createAsyncExecContext(() => {
          this.loading = false;
        }),
        4000,
      );
    },
    onReset() {
      this.loading = true;

      setTimeout(
        this.$createAsyncExecContext(() => {
          this.searchRecord = {
            name: '',
            describe: '',
            createUser: '-1',
            status: '-1',
            createTime: '',
          };

          this.loading = false;
        }),
        500,
      );
    },
    onNew() {
      this.newRecord = {
        name: '',
        createUser: '',
        status: '',
        describe: '',
        createTime: '',
      };
      this.visibleNewModal = true;
    },
    onNewOk() {
      this.loading = true;

      this.visibleNewModal = false;

      setTimeout(
        this.$createAsyncExecContext(function () {
          this.dataSource.push({
            id: v1(),
            name: this.newRecord.name,
            createUser: this.newRecord.createUser,
            status: this.newRecord.status,
            describe: this.newRecord.describe,
            createTime: this.newRecord.createTime,
          });

          this.loading = false;
        }),
        500,
      );
    },
    onEdit(record) {
      this.editRecord = record;
      this.visibleEditModal = true;
    },
    onEditOk() {
      this.loading = true;

      const index = this.dataSource.findIndex((t) => t.id === this.editRecord.id);

      const record = this.dataSource[index];

      this.visibleEditModal = false;

      setTimeout(
        this.$createAsyncExecContext(function () {
          record.name = this.editRecord.name;
          record.createUser = this.editRecord.createUser;
          record.status = this.editRecord.status;
          record.describe = this.editRecord.describe;
          record.createTime = this.editRecord.createTime;

          this.loading = false;
        }),
        500,
      );
    },
    onView(record) {
      this.viewRecord = record;
      this.visibleViewModal = true;
    },
    onViewOk() {
      this.visibleViewModal = false;
    },
    onDelete(id) {
      delId = id;
      this.visibleDeleteConfirm = true;
    },
    onDeleteConfirmOk() {
      this.loading = true;
      this.visibleDeleteConfirm = false;

      setTimeout(
        this.$createAsyncExecContext(function () {
          const index = this.dataSource.findIndex((t) => t.id === delId);
          this.dataSource.splice(index, 1);
          this.loading = false;
        }),
        500,
      );
    },
    getUserLabel(value) {
      return this.userSelectList.find((t) => t.value === value).label;
    },
    getStateLabel(value) {
      return this.statusSelectList.find((t) => t.value === value).label;
    },
  },
  mounted() {
    setTimeout(
      this.$createAsyncExecContext(() => {
        this.dataSource = [
          {
            id: v1(),
            name: '任务1',
            createUser: '1',
            status: '1',
            describe: '任务1',
            createTime: '2010-10-12',
          },
          {
            id: v1(),
            name: '任务2',
            createUser: '2',
            status: '2',
            describe: '任务2',
            createTime: '2010-10-15',
          },
          {
            id: v1(),
            name: '任务3',
            createUser: '3',
            status: '3',
            describe: '任务3',
            createTime: '2010-10-16',
          },
        ];
        this.loading = false;
      }),
      500,
    );
  },
};
