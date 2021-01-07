/**
 * 业务可以是A-B-C的方式
 common-{业务}-font-size
 common-{业务}-box-shadow
 common-{业务}-background-color
 */

const commonVars = {
  // 全局缺省的字体大小
  '@common-normal-font-size': '15px',
  // 系统名称大小
  '@common-system-title-font-size': '21px',
  // 界面主标题大小
  '@common-primary-title-font-size': '16px',
  // 辅助文字大小 | 链接 | 提示
  '@common-assist-font-size': '12px',

  // 主要文字颜色
  '@common-primary-color': '#222',
  // 辅助文字颜色
  '@common-assist-color': '#888',
  // 提示文字颜色
  '@common-tip-color': '#999',
  // 禁用文字颜色
  '@common-disable-color': '#c3c3c3',
  // 链接文字颜色
  '@common-link-color': '#0099cb',

  // 上传弹窗文字颜色
  '@upload-primary-color': '#333',
  '@upload-gray-color': '#999',

  // 边框颜色
  '@common-normal-border-color': '#ddd',
  // 全局默认的boxShadow
  '@common-normal-box-shadow': '0 0 5px 0 rgba(0,0,0,0.10)',
  // 全局默认的背景色
  '@common-normal-background-color': '#f8f8f8',
  // 全局滚动条scrollbar-thumb背景色
  '@common-normal-scrollbar-thumb-background-color': '#d8d8d8',
  // 全局滚动条scrollbar背景色
  '@common-normal-scrollbar-background-color': '#efefef',
  // id为app的元素最小宽度
  '@common-normal-min-width': '1366px',
  // 主颜色
  '@primary-color': '#1890ff',
  // 导航颜色
  '@common-navigator-background-color': '#13927D',
  // 导航选中颜色
  '@common-navigator-active-background-color': '#16867A',
  // 面包屑背景色
  '@common-bread-background-color': '#168F82',
  // 错误颜色
  '@common-error-color': '#D9001B',
  // 鼠标经过背景色
  '@common-mouse-hover-background-color': 'rgba(23, 162, 147, 80%)',
  // 鼠标激活背景色
  '@common-mouse-active-background-color': 'rgba(23, 162, 147, 10%)',

  // block背景色
  '@common-block-background-color': '#f0f2f5',
  // 组件背景色
  '@common-component-background-color': '#fff',

  // vertical paddings
  '@common-padding-lg': '24px',
  '@common-padding-md': '16px',
  '@common-padding-sm': '12px',
  '@common-padding-xs': '8px',
  '@common-padding-xss': '4px',

  // vertical margins
  '@common-margin-lg': '24px',
  '@common-margin-md': '16px',
  '@common-margin-sm': '12px',
  '@common-margin-xs': '8px',
  '@common-margin-xss': '4px',
  // height rules
  '@common-height-base': '32px',
  '@common-height-lg': '40px',
  '@common-height-sm': '24px',

  // font Awesome
  '@common-fontawesome-css-prefix': 'fa fa-',

  // LINK
  '@common-link-decoration': 'none',
  '@common-link-hover-decoration': 'none',
  '@common-link-focus-decoration': 'none',
  '@common-link-focus-outline': '0',

  // Border color
  '@common-border-color-base': 'hsv(0, 0, 85%)',
  '@common-border-color-split': 'hsv(0, 0, 94%)',
  '@common-border-width-base': '1px',
  '@common-border-style-base': 'solid',

  // background
  '@common-backgeound-hover-color': 'rgba(19,146,125,.1)',

  // Outline
  '@common-outline-blur-size': '0',
  '@common-outline-width': '2px',
  '@common-outline-fade': '20%',

  '@common-background-color-light': 'hsv(0, 0, 98%);',
  '@common-background-color-base': 'hsv(0, 0, 96%);',

  // zIndex
  '@common-max-zindex': '19999',

  // menu
  '@common-menu-background-color': '#071b28',
  '@common-menu-split-color': '#13927D',
};

module.exports = commonVars;
