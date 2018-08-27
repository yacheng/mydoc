window.raxdoc = `

# Rax 实践教程(开源版精编)

本文以初学者视角，从简单入门开始，串一下 Rax 使用上的问题。本文只涉及开源仓库所提供的能力，内部 API 不做讲解。阅读受众是前端以及有部分前端基础的客户端同学，Weex 技术体系的开发人员。

本文不是文档，而是上层实践，篇幅较长。如果需要查阅文档，可以移步这里 [Rax 官网](https://github.com/alibaba/rax)。相关配套： [Rax 组件示例](https://jsplayground.taobao.org/album?name=RaxComponent)、[Rax API 示例](https://jsplayground.taobao.org/album?name=RaxFrameworkApi)、[在线编码尝试](https://jsplayground.taobao.org/raxplayground)

本文讲解大纲：

* 基础教程
  * Hello World
  * 什么是 Rax
  * 简单 native 知识
  * Rax 与 Weex
  * framework
  * 样式
  * 长列表
  * binding
* 进阶教程
  * 工具
  * 调试
  * 性能
  * 国际化
  * 单页应用
  * jsservice

## Hello World

先写一个简单的例子，拆解一下每个不受都要做什么

```

```

## 什么是 Rax

![](https://gw.alicdn.com/tfs/TB1CU6ofb_I8KJjy1XaXXbsxpXa-867-203.jpg)

Rax 是一个源自淘宝的开源项目 [https://github.com/alibaba/rax](https://github.com/alibaba/rax) 是一个 Weex 上层的类 React DSL。

与 React 在语法层面一致，但也有部分区别如下
* 没有 createClass() 方法
* Rax setState() 是同步的, React setState 是异步的
* findDOMNode() 方法可以接收字符串类型的 id
* PropTypes 只是 React 的接口兼容

![](https://gw.alicdn.com/tfs/TB1xFm0fm_I8KJjy0FoXXaFnVXa-692-345.jpg)

JSX

生命周期

通用事件







`;