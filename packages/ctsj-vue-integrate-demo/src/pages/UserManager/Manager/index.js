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
          key: 'idCard',
          dataIndex: 'idCard',
          title: '身份证',
        },
        {
          key: 'name',
          dataIndex: 'name',
          title: '姓名',
        },
        {
          key: 'sex',
          dataIndex: 'sex',
          title: '性別',
          renderSlot: 'sex-select',
        },
        {
          key: 'birthday',
          dataIndex: 'birthday',
          title: '出生年月',
        },
        {
          key: 'hometown',
          dataIndex: 'hometown',
          title: '籍貫',
        },
        {
          key: 'city',
          dataIndex: 'city',
          title: '所在城市',
        },
        {
          key: 'education',
          dataIndex: 'education',
          title: '学历',
          renderSlot: 'education-select',
        },
        {
          key: 'years',
          dataIndex: 'years',
          title: '工作年限',
        },
        {
          key: 'marriage',
          dataIndex: 'marriage',
          title: '婚否',
          renderSlot: 'marriage-select',
        },
      ],
      dataSource: [],
      rowKey: 'id',
      loading: true,
      visibleDeleteConfirm: false,

      searchRecord: {
        idCard: '',
        name: '',
        sex: '-1',
        birthday: '',
        hometown: '',
        city: '',
        education: '-1',
        years: '',
        marriage: '-1',
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
                  <td>身份证：</td>
                  <td><input type="text" v-model="searchRecord.idCard"/></td>
                  
                  <td>姓名：</td>
                  <td><input type="text" v-model="searchRecord.name"/></td>
                  
                  <td>性别：</td>
                  <td>
                    <select v-model="searchRecord.sex">
                      <option 
                        v-for="item in sexSelectList" 
                        v-bind:key="item.value"
                        v-bind:value="item.value">{{item.label}}</option>
                    </select>
                  </td>
                </tr>
                
                <tr>
                  <td>出生年月：</td>
                  <td><input type="text" v-model="searchRecord.birthday"/></td>
                  
                  <td>籍贯：</td>
                  <td><input type="text" v-model="searchRecord.hometown"/></td>
                  
                  <td>所在城市：</td>
                  <td><input type="text" v-model="searchRecord.city"/></td>
                </tr>
                
                <tr>
                  <td>学历：</td>
                  <td>
                    <select v-model="searchRecord.education">
                      <option 
                        v-for="item in educationSelectList" 
                        v-bind:key="item.value"
                        v-bind:value="item.value">{{item.label}}</option>
                    </select>
                  </td>
                  
                  <td>工作年限：</td>
                  <td><input type="text" v-model="searchRecord.years"/></td>
                  
                  <td>婚否：</td>
                  <td>
                    <select v-model="searchRecord.marriage">
                      <option 
                        v-for="item in marriageSelectList" 
                        v-bind:key="item.value"
                        v-bind:value="item.value">{{item.label}}</option>
                    </select>
                  </td>
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
          <div>人员表格</div>
        </template>
        
        <!--   表格右侧面板   -->
        <template v-slot:extra>
          <div>
            <v-button primary v-on:click="$router.push('/user/save')">新建</v-button>
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
          </v-table>
        </template>
      </search-table-layout>
      
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
      const {
        idCard,
        name,
        sex,
        birthday,
        hometown,
        city,
        education,
        years,
        marriage,
      } = this.searchRecord;

      return this.dataSource
        .filter((record) => {
          if (idCard) {
            return record.idCard.indexOf(idCard) !== '-1';
          }

          return true;
        })
        .filter((record) => {
          if (name) {
            return record.name.indexOf(name) !== '-1';
          }

          return true;
        })
        .filter((record) => {
          if (birthday) {
            return record.birthday.indexOf(birthday) !== '-1';
          }

          return true;
        })
        .filter((record) => {
          if (sex !== '-1') {
            return record.sex === sex;
          }

          return true;
        })
        .filter((record) => {
          if (education !== '-1') {
            return record.education === education;
          }

          return true;
        })
        .filter((record) => {
          if (marriage !== '-1') {
            return record.marriage === marriage;
          }

          return true;
        })
        .filter((record) => {
          if (hometown) {
            return record.hometown.indexOf(hometown) !== '-1';
          }

          return true;
        })
        .filter((record) => {
          if (city) {
            return record.city.indexOf(city) !== '-1';
          }

          return true;
        })
        .filter((record) => {
          if (years) {
            return record.years.indexOf(years) !== '-1';
          }

          return true;
        });
    },
    sexSelectList() {
      return [
        {
          label: '全部',
          value: '-1',
        },
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ];
    },
    educationSelectList() {
      return [
        {
          label: '全部',
          value: '-1',
        },
        {
          label: '小学',
          value: '1',
        },
        {
          label: '中学',
          value: '2',
        },
        {
          label: '高中',
          value: '3',
        },
        {
          label: '大专',
          value: '4',
        },
        {
          label: '学士',
          value: '5',
        },
        {
          label: '硕士',
          value: '6',
        },
        {
          label: '博士',
          value: '7',
        },
      ];
    },
    marriageSelectList() {
      return [
        {
          label: '全部',
          value: '-1',
        },
        {
          label: '是',
          value: '1',
        },
        {
          label: '否',
          value: '2',
        },
      ];
    },
  },
  methods: {
    onReset() {},
    onSearch() {},
    onEdit() {},
    onView() {},
    onDelete() {},
    onDeleteConfirmOk() {},
  },
  mounted() {
    setTimeout(
      this.$createAsyncExecContext(() => {
        this.loading = false;
      }),
      500,
    );
  },
};
