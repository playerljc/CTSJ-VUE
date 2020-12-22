import echarts from 'echarts';

import styles from './index.less';

export default {
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
        <template v-slot:title>
          <nav></nav>
        </template>
        
        <template v-slot:extra>extra</template>
        
        <template v-slot:default>
          <div class="${styles.Flex}">
            <div class="${styles.Auto}">
              <sales></sales>
            </div>
            <div class="${styles.Fixed}">
              <views></views>
            </div>
          </div>
        </template>
      </system-card>
    </div>
  `,
  components: {
    // 销售额
    sales: {
      template: `<div>sales</div>`,
    },
    // 访问量
    views: {
      template: `<div>views</div>`,
    },
    // 导航
    nav: {
      props: ['data', 'activeKey'],
      template: `
        <div class="${styles.NavWrap}"></div>
      `,
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
