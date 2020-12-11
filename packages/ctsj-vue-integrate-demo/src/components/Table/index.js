import styles from './index.less';

export default {
  props: ['columns', 'dataSource', 'rowKey'],
  template: `
    <div class="${styles.Wrap}">
      <table>
        <thead>
          <tr>
            <th v-for="(item,index) in columns" v-bind:key="item.key">{{item.title}}</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="(item,index) in dataSource" v-bind:key="item[rowKey]">
            <td v-for="columnItem in columns" v-bind:key="columnItem.key">
              <template v-if="'renderSlot' in columnItem">
                <slot 
                  v-bind:name="columnItem.renderSlot" 
                  v-bind:record="item" 
                  v-bind:column="columnItem"
                  v-bind:rowIndex="index"
                ></slot>
              </template>
              <span v-else>{{item[columnItem.dataIndex]}}</span>
            </td>
          </tr>
        </tbody>
        
      </table>
    </div>
  `,
};
