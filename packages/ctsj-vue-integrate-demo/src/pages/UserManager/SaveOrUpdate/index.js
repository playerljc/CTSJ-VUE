import { v1 } from 'uuid';

import styles from './index.less';

export default {
  data() {
    return {
      // 基本的信息
      idCard: '',
      name: '',
      sex: '-1',
      birthday: '',
      hometown: '',
      city: '',
      education: '-1',
      years: '',
      marriage: '-1',

      // 联系电话
      contactNumbers: [],
      contactNumberTableColumns: [
        {
          key: 'number',
          dataIndex: 'number',
          title: '序号',
          renderSlot: 'number',
        },
        {
          key: 'type',
          dataIndex: 'type',
          title: '类型',
          renderSlot: 'type',
        },
        {
          key: 'value',
          dataIndex: 'value',
          title: '号码',
          renderSlot: 'value',
        },
        {
          key: 'option',
          dataIndex: 'option',
          title: '操作',
          renderSlot: 'option',
        },
      ],

      // 邮箱
      email: [],
      emailTableColumns: [
        {
          key: 'number',
          dataIndex: 'number',
          title: '序号',
          renderSlot: 'number',
        },
        {
          key: 'type',
          dataIndex: 'type',
          title: '类型',
          renderSlot: 'type',
        },
        {
          key: 'value',
          dataIndex: 'value',
          title: '地址',
          renderSlot: 'value',
        },
        {
          key: 'option',
          dataIndex: 'option',
          title: '操作',
          renderSlot: 'option',
        },
      ],

      // 家庭成员
      family: [],
      familyActiveKey: '',
    };
  },
  template: `
    <div class="${styles.Wrap}">
      <!--  基本信息  -->
      <!--  
          头像
          身份证
          姓名
          性别
          出生年月
          籍贯
          所在城市
          学历
          工作年限
          婚否
          -->
      <system-card>
        <template v-slot:title>
          <div>基本信息</div>
        </template>
        
        <v-layout direction="horizontal">
          <template v-slot:left>
            头像上传组件
          </template>
          
          <template v-slot:center>
            <div class="${styles.InputForm}">
              <table>
                <tbody>
                  <tr>
                    <td>身份证：</td>
                    <td>
                      <input type="text" v-model="idCard"/>
                    </td>
                    <td>姓名：</td>
                    <td>
                      <input type="text" v-model="name"/>
                    </td>
                    <td>性别：</td>
                    <td>
                      <select v-model="sex">
                        <option 
                          v-for="item in sexSelectList" 
                          v-bind:key="item.value"
                          v-bind:value="item.value">{{item.label}}</option>
                      </select>
                    </td>
                  </tr>
                  
                  <tr>
                    <td>出生年月：</td>
                    <td>
                      <input type="text" v-model="birthday"/>
                    </td>
                    <td>籍贯：</td>
                    <td>
                      <input type="text" v-model="hometown"/>
                    </td>
                    <td>所在城市：</td>
                    <td>
                      <input type="text" v-model="city"/>
                    </td>
                  </tr>
                  
                  <tr>
                    <td>学历：</td>
                    <td>
                      <select v-model="education">
                        <option 
                          v-for="item in educationSelectList" 
                          v-bind:key="item.value"
                          v-bind:value="item.value">{{item.label}}</option>
                      </select>
                    </td>
                    <td>工作年限：</td>
                    <td>
                      <input type="text" v-model="years"/>
                    </td>
                    <td>婚否：</td>
                    <td>
                      <select v-model="marriage">
                        <option 
                          v-for="item in marriageSelectList" 
                          v-bind:key="item.value"
                          v-bind:value="item.value">{{item.label}}</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </v-layout>
      </system-card>
      
      <v-space></v-space>
      
      <!-- 联系电话多个，可编辑的表格 -->
      <system-card>
        <template v-slot:title>
          <div>联系电话</div>
        </template>
        
        <v-layout direction="vertical">
           <template v-slot:top>
             <v-button primary v-on:click="onNewContactNumber">新建</v-button>
           </template>
           <template v-slot:center>
             <!-- 表格 -->
             <v-table
              v-bind:columns="contactNumberTableColumns" 
              v-bind:data-source="contactNumbers" 
              row-key="id"
             >
              <!-- 序号 -->
              <template v-slot:number="slotProps">
                <span>{{slotProps.rowindex + 1}}</span>
              </template>
              
              <!-- 操作列 -->
              <template v-slot:option="slotProps">
                <a class="${styles.OptionItem}" v-on:click="onContactNumberDelete(slotProps.record.id,$event)">删除</a>
              </template>
              
              <!-- 类型 -->
              <template v-slot:type="slotProps">
                <div class="${styles.InputForm}" v-if="slotProps.record.typeActive">
                  <select 
                    autofocus
                    v-bind:value="slotProps.record.type"
                    v-on:change="onContactNumberTypeChange(slotProps.record.id,$event)"
                    v-on:blur="onContactNumberEditorCellUnActive(slotProps.record.id,'typeActive')">
                    <option v-for="item in contactNumbersSelectList" 
                            v-bind:key="item.value" 
                            v-bind:value="item.value"
                            >{{item.label}}</option>
                  </select>
                </div>
                <div 
                    v-else class="${styles.EditorCell}" 
                    v-on:click="onContactNumberEditorCellActive(slotProps.record.id,'typeActive')">{{getOptionLabel({'list':contactNumbersSelectList,'value':slotProps.record.type,'prop':'value'})}}</div>
              </template>
              
              <!-- 号码 -->
              <template v-slot:value="slotProps">
                <div class="${styles.InputForm}" v-if="slotProps.record.valueActive">
                  <input 
                    type="number" 
                    v-bind:value="slotProps.record.value"
                    v-on:blur="onContactNumberValueChange(slotProps.record.id,$event)">
                </div>
                <div 
                  v-else class="${styles.EditorCell}"
                  v-on:click="onContactNumberEditorCellActive(slotProps.record.id,'valueActive')"
                  >{{slotProps.record.value}}</div>
              </template>
             </v-table>
           </template>
         </v-layout>
      </system-card>
      
      <v-space></v-space>
        
      <!-- 邮箱多个，可编辑的表格 -->
      <system-card>
        <template v-slot:title>
          <div>邮箱</div>
        </template>
        
        <v-layout direction="vertical">
           <template v-slot:top>
             <v-button primary v-on:click="onNewEmail">新建</v-button>
           </template>
           <template v-slot:center>
             <!-- 表格 -->
             <v-table
              v-bind:columns="emailTableColumns" 
              v-bind:data-source="email" 
              row-key="id"
             >
              <!-- 序号 -->
              <template v-slot:number="slotProps">
                <span>{{slotProps.rowindex + 1}}</span>
              </template>
              
              <!-- 操作列 -->
              <template v-slot:option="slotProps">
                <a class="${styles.OptionItem}" v-on:click="onEmailDelete(slotProps.record.id,$event)">删除</a>
              </template>
              
              <!-- 类型 -->
              <template v-slot:type="slotProps">
                <div class="${styles.InputForm}" v-if="slotProps.record.typeActive">
                  <select 
                    autofocus
                    v-bind:value="slotProps.record.type"
                    v-on:change="onEmailTypeChange(slotProps.record.id,$event)"
                    v-on:blur="onEmailEditorCellUnActive(slotProps.record.id,'typeActive')">
                    <option v-for="item in emailSelectList" 
                            v-bind:key="item.value" 
                            v-bind:value="item.value"
                            >{{item.label}}</option>
                  </select>
                </div>
                <div 
                    v-else class="${styles.EditorCell}" 
                    v-on:click="onEmailEditorCellActive(slotProps.record.id,'typeActive')">{{getOptionLabel({'list':emailSelectList,'value':slotProps.record.type,'prop':'value'})}}</div>
              </template>
              
              <!-- 号码 -->
              <template v-slot:value="slotProps">
                <div class="${styles.InputForm}" v-if="slotProps.record.valueActive">
                  <input 
                    type="email" 
                    v-bind:value="slotProps.record.value"
                    v-on:blur="onEmailValueChange(slotProps.record.id,$event)">
                </div>
                <div 
                  v-else class="${styles.EditorCell}"
                  v-on:click="onEmailEditorCellActive(slotProps.record.id,'valueActive')"
                  >{{slotProps.record.value}}</div>
              </template>
             </v-table>
           </template>
         </v-layout>
      </system-card>
      
      <v-space></v-space>
      
      <!-- 家庭成员多个，选项卡 -->
      <system-card>
        <template v-slot:title>
          <div>家庭成员</div>
        </template>
        <template v-slot:extra>
          <v-button primary v-on:click="onNewFamily">新建</v-button>
        </template>
        
        <v-tabs v-bind:tabs="family" v-bind:active-key="familyActiveKey" v-on:change="onFamilyTabChange">
          <template v-slot:[familyActiveKey]>
            <div class="${styles.InputForm}">
            <table>
              <tbody>
                <tr>
                  <td>身份证：</td>
                  <td>
                    <input type="text" v-model="idCard"/>
                  </td>
                  <td>姓名：</td>
                  <td>
                    <input type="text" v-model="name"/>
                  </td>
                  <td>性别：</td>
                  <td>
                    <select v-model="sex">
                      <option 
                        v-for="item in sexSelectList" 
                        v-bind:key="item.value"
                        v-bind:value="item.value">{{item.label}}</option>
                    </select>
                  </td>
                </tr>
                
                <tr>
                  <td>出生年月：</td>
                  <td>
                    <input type="text" v-model="birthday"/>
                  </td>
                  <td>籍贯：</td>
                  <td>
                    <input type="text" v-model="hometown"/>
                  </td>
                  <td>所在城市：</td>
                  <td>
                    <input type="text" v-model="city"/>
                  </td>
                </tr>
                
                <tr>
                  <td>学历：</td>
                  <td>
                    <select v-model="education">
                      <option 
                        v-for="item in educationSelectList" 
                        v-bind:key="item.value"
                        v-bind:value="item.value">{{item.label}}</option>
                    </select>
                  </td>
                  <td>工作年限：</td>
                  <td>
                    <input type="text" v-model="years"/>
                  </td>
                  <td>婚否：</td>
                  <td>
                    <select v-model="marriage">
                      <option 
                        v-for="item in marriageSelectList" 
                        v-bind:key="item.value"
                        v-bind:value="item.value">{{item.label}}</option>
                    </select>
                  </td>
                </tr>
              </tbody>
          </table>
          </div>
          </template>
        </v-tabs>
      </system-card>
      
      <!-- 证件信息多个，选项卡 -->
      
    </div>
  `,
  computed: {
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
    contactNumbersSelectList() {
      return [
        {
          label: '移动电话',
          value: '1',
        },
        {
          label: '固定电话',
          value: '2',
        },
      ];
    },
    emailSelectList() {
      return [
        {
          label: '常用',
          value: '1',
        },
        {
          label: '其他',
          value: '2',
        },
      ];
    },
  },
  methods: {
    getOptionLabel({ list, value, prop }) {
      const entry = list.find((t) => t[prop] === value);

      if (entry) {
        return entry.label;
      }

      return '';
    },

    onContactNumberDelete(id) {
      const index = this.contactNumbers.findIndex((t) => t.id === id);
      this.contactNumbers.splice(index, 1);
    },
    onNewContactNumber() {
      this.contactNumbers.push({
        id: v1(),
        type: '',
        value: '',
        typeActive: false,
        valueActive: false,
      });
    },
    onContactNumberEditorCellActive(id, prop) {
      const entry = this.contactNumbers.find((t) => t.id === id);
      entry[prop] = true;
    },
    onContactNumberEditorCellUnActive(id, prop) {
      const entry = this.contactNumbers.find((t) => t.id === id);
      entry[prop] = false;
    },
    onContactNumberTypeChange(id, e) {
      const entry = this.contactNumbers.find((t) => t.id === id);
      entry.type = e.target.value;
      entry.typeActive = false;
    },
    onContactNumberValueChange(id, e) {
      const entry = this.contactNumbers.find((t) => t.id === id);
      entry.value = e.target.value.trim();
      entry.valueActive = false;
    },

    onEmailDelete(id) {
      const index = this.email.findIndex((t) => t.id === id);
      this.email.splice(index, 1);
    },
    onNewEmail() {
      this.email.push({
        id: v1(),
        type: '',
        value: '',
        typeActive: false,
        valueActive: false,
      });
    },
    onEmailEditorCellActive(id, prop) {
      const entry = this.email.find((t) => t.id === id);
      entry[prop] = true;
    },
    onEmailEditorCellUnActive(id, prop) {
      const entry = this.email.find((t) => t.id === id);
      entry[prop] = false;
    },
    onEmailTypeChange(id, e) {
      const entry = this.email.find((t) => t.id === id);
      entry.type = e.target.value;
      entry.typeActive = false;
    },
    onEmailValueChange(id, e) {
      const entry = this.email.find((t) => t.id === id);
      entry.value = e.target.value.trim();
      entry.valueActive = false;
    },

    onNewFamily() {
      const key = v1();

      this.family.push({
        key,
        title: '家人',
      });

      this.familyActiveKey = v1();
    },
    onFamilyTabChange(activeKey) {
      this.familyActiveKey = activeKey;
    },
  },
};
