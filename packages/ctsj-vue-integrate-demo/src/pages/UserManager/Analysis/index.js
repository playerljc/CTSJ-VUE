import echarts from 'echarts';

import styles from './index.less';

export default {
  data() {
    return {
      nav1Data: [
        {
          title: '销售额',
          key: '1',
        },
        {
          title: '访问量',
          key: '2',
        },
      ],
      nav1ActiveKey: '1',
      nav2Data: [
        {
          title: '今日',
          key: '1',
        },
        {
          title: '本周',
          key: '2',
        },
        {
          title: '本月',
          key: '3',
        },
        {
          title: '全年',
          key: '4',
        },
      ],
      nav2ActiveKey: '1',
    };
  },
  // 动态组件
  template: `
    <div class="${styles.Wrap}">
      <!-- 第一部分 -->
      <div class="${styles.Grid}">
        <div class="${styles.Item}">
          <system-block>
            <div ref="gridChart1" style="height: 300px;"></div>
          </system-block>
        </div>
        
        <div class="${styles.Item}">
          <system-block>
            <div ref="gridChart2" style="height: 300px;"></div>
          </system-block>
        </div>
        
        <div class="${styles.Item}">
          <system-block>
            <div ref="gridChart3" style="height: 300px;"></div>
          </system-block>
        </div>
        
        <div class="${styles.Item}">
          <system-block>
            <div ref="gridChart4" style="height: 300px;"></div>
          </system-block>
        </div>
      </div>
      
      <!-- 第二部分 -->
      <system-card>
        <!-- nav导航菜单 -->
        <template v-slot:title>
          <nav v-bind:data="nav1Data" v-bind:active-key="nav1ActiveKey" v-on:change="onNav1Change"></nav>
        </template>
        
        <!-- 右侧的导航 -->
        <template v-slot:extra>
          <nav v-bind:data="nav2Data" v-bind:active-key="nav2ActiveKey" v-on:change="onNav2Change"></nav>
        </template>
        
        <template v-slot:default>
          <div class="${styles.Flex}">
            <div class="${styles.Auto}">
              <component v-bind:is="nav1ComponentName"></component>
            </div>
            <div class="${styles.Fixed}" style="width: 400px;">
              <component v-bind:is="nav2ComponentName"></component>
            </div>
          </div>
        </template>
      </system-card>
    </div>
  `,
  methods: {
    onNav1Change(key) {
      this.nav1ActiveKey = key;
    },
    onNav2Change(key) {
      this.nav2ActiveKey = key;
    },
  },
  computed: {
    nav1ComponentName() {
      return this.nav1ActiveKey === '1' ? 'sales' : 'views';
    },
    nav2ComponentName() {
      const map = new Map([
        ['1', 'today'],
        ['2', 'week'],
        ['3', 'month'],
        ['4', 'annual'],
      ]);

      return map.get(this.nav2ActiveKey);
    },
  },
  components: {
    // 销售额
    sales: {
      template: `<div ref="chart" style="height: 400px;"></div>`,
      mounted() {
        const chart = echarts.init(this.$refs.chart);
        chart.setOption({
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '2015', '2016', '2017'],
              ['Matcha Latte', 43.3, 85.8, 93.7],
              ['Milk Tea', 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 86.4, 65.2, 82.5],
              ['Walnut Brownie', 72.4, 53.9, 39.1],
            ],
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
        });
      },
    },
    // 访问量
    views: {
      template: `<div ref="chart" style="height: 400px;"></div>`,
      mounted() {
        const chart = echarts.init(this.$refs.chart);
        chart.setOption({
          dataset: {
            source: [
              ['score', 'amount', 'product'],
              [89.3, 58212, 'Matcha Latte'],
              [57.1, 78254, 'Milk Tea'],
              [74.4, 41032, 'Cheese Cocoa'],
              [50.1, 12755, 'Cheese Brownie'],
              [89.7, 20145, 'Matcha Cocoa'],
              [68.1, 79146, 'Tea'],
              [19.6, 91852, 'Orange Juice'],
              [10.6, 101852, 'Lemon Juice'],
              [32.7, 20112, 'Walnut Brownie'],
            ],
          },
          grid: { containLabel: true },
          xAxis: { name: 'amount' },
          yAxis: { type: 'category' },
          visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 10,
            max: 100,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
              color: ['#D7DA8B', '#E15457'],
            },
          },
          series: [
            {
              type: 'bar',
              encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "product" column to Y axis
                y: 'product',
              },
            },
          ],
        });
      },
    },

    // 今日
    today: {
      template: `<div ref="chart" style="height: 400px;"></div>`,
      mounted() {
        const chart = echarts.init(this.$refs.chart);
        chart.setOption({
          title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        });
      },
    },
    // 本周
    week: {
      template: `<div ref="chart" style="height: 400px;"></div>`,
      mounted() {
        const chart = echarts.init(this.$refs.chart);
        chart.setOption({
          title: {
            text: '浏览器占比变化',
            subtext: '纯属虚构',
            top: 10,
            left: 10,
          },
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,250,0.2)',
          },
          legend: {
            type: 'scroll',
            bottom: 10,
            data: (function () {
              const list = [];
              for (let i = 1; i <= 28; i++) {
                list.push(`${i + 2000}`);
              }
              return list;
            })(),
          },
          visualMap: {
            top: 'middle',
            right: 10,
            color: ['red', 'yellow'],
            calculable: true,
          },
          radar: {
            indicator: [
              { text: 'IE8-', max: 400 },
              { text: 'IE9+', max: 400 },
              { text: 'Safari', max: 400 },
              { text: 'Firefox', max: 400 },
              { text: 'Chrome', max: 400 },
            ],
          },
          series: (function () {
            const series = [];
            for (let i = 1; i <= 28; i++) {
              series.push({
                name: '浏览器（数据纯属虚构）',
                type: 'radar',
                symbol: 'none',
                lineStyle: {
                  width: 1,
                },
                emphasis: {
                  areaStyle: {
                    color: 'rgba(0,250,0,0.3)',
                  },
                },
                data: [
                  {
                    value: [(40 - i) * 10, (38 - i) * 4 + 60, i * 5 + 10, i * 9, (i * i) / 2],
                    name: `${i + 2000}`,
                  },
                ],
              });
            }
            return series;
          })(),
        });
      },
    },
    // 本月
    month: {
      template: `<div ref="chart" style="height: 400px;"></div>`,
      mounted() {
        const chart = echarts.init(this.$refs.chart);
        chart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220],
            },
          ],
        });
      },
    },
    // 全年
    annual: {
      template: `<div ref="chart" style="height: 400px;"></div>`,
      mounted() {
        const chart = echarts.init(this.$refs.chart);
        chart.setOption({
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%',
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {},
            },
          },
          series: [
            {
              name: '业务指标',
              type: 'gauge',
              detail: { formatter: '{value}%' },
              data: [{ value: 50, name: '完成率' }],
            },
          ],
        });
      },
    },

    // 导航
    nav: {
      props: ['data', 'activeKey'],
      template: `
        <div class="${styles.NavWrap}">
          <ul class="${styles.NavInner}">
            <li 
              v-bind:class="itemClassObj(item.key)" 
              v-for="item in data" 
              v-bind:key="item.key"
              v-on:click="$emit('change', item.key)"
              >
              <span>{{item.title}}</span>
            </li>
          </ul>
        </div>
      `,
      methods: {
        itemClassObj(key) {
          return {
            [styles.NavItem]: true,
            [styles.Active]: this.activeKey === key,
          };
        },
      },
    },
  },
  mounted() {
    const chart1 = echarts.init(this.$refs.gridChart1);
    chart1.setOption({
      title: {
        text: '堆叠区域图',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top',
            },
          },
          areaStyle: {},
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    });

    const chart2 = echarts.init(this.$refs.gridChart2);
    chart2.setOption({
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    });

    const chart3 = echarts.init(this.$refs.gridChart3);
    chart3.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: [
          '直接访问',
          '邮件营销',
          '联盟广告',
          '视频广告',
          '搜索引擎',
          '百度',
          '谷歌',
          '必应',
          '其他',
        ],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: '邮件营销',
          type: 'bar',
          stack: '广告',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '联盟广告',
          type: 'bar',
          stack: '广告',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: '视频广告',
          type: 'bar',
          stack: '广告',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: '搜索引擎',
          type: 'bar',
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine: {
            lineStyle: {
              type: 'dashed',
            },
            data: [[{ type: 'min' }, { type: 'max' }]],
          },
        },
        {
          name: '百度',
          type: 'bar',
          barWidth: 5,
          stack: '搜索引擎',
          data: [620, 732, 701, 734, 1090, 1130, 1120],
        },
        {
          name: '谷歌',
          type: 'bar',
          stack: '搜索引擎',
          data: [120, 132, 101, 134, 290, 230, 220],
        },
        {
          name: '必应',
          type: 'bar',
          stack: '搜索引擎',
          data: [60, 72, 71, 74, 190, 130, 110],
        },
        {
          name: '其他',
          type: 'bar',
          stack: '搜索引擎',
          data: [62, 82, 91, 84, 109, 110, 120],
        },
      ],
    });

    const chart4 = echarts.init(this.$refs.gridChart4);
    chart4.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      series: [
        {
          name: '直接访问',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'insideRight',
          },
          data: [320, 302, 301, 334, 390, 330, 320],
        },
        {
          name: '邮件营销',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'insideRight',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: '联盟广告',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'insideRight',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: '视频广告',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'insideRight',
          },
          data: [150, 212, 201, 154, 190, 330, 410],
        },
        {
          name: '搜索引擎',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'insideRight',
          },
          data: [820, 832, 901, 934, 1290, 1330, 1320],
        },
      ],
    });
  },
};
