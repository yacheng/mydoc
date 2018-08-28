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




## <a href="l3"></a> Rax 与 Weex

阅读这一章节，需要你提前对 Rax 有一定的了解，下面根据其中 Native 与 Web 的不同点，帮助你更好的理解其中的实现。

### 页面布局

**布局**

Flexbox 是 Weex 中默认且唯一的布局模型，不需要手动为元素添加 display: flex; 属性。传统 web 布局花样繁多，不过 weex 上我们布局的方式有些局限，比如我们无法使用 float 布局，对于 absolute 布局最好我们也需要谨慎使用（长列表性能考虑）。（布局样式参考[这里](https://weex-project.io/cn/references/common-style.html)和[这里](https://www.atatech.org/articles/92420)）

**样式**

Weex 中样式使用限制包括

* 写在组件 style 里的样式只能用在当前组（作用域默认是 scoped）
* 样式不能继承
* 文本样式只能作用于 Text 标签，如 fontSize
* 支持的样式属性有限，如不支持 z-index

Weex 对于 CSS 的支持相比 Web 弱了很多，很多酷炫的 CSS 必杀技在 Weex 上是不太好施展拳脚的，所以在我们写样式之前最好能先读一读 Weex 的 [通用样式](http://weex-project.io/cn/references/common-style.html) 和 [文本样式](http://weex-project.io/cn/references/text-style.html)


**单位**

Weex 中做元素的布局时需要先了解一下 Rax 在 weex 上的单位，Weex 天生支持 wx 和 px

* rem:  Rax 中推荐单位，无单位默认也是 rem，rem 单位是将页面 750 等分计算的，同 Weex 中的 px 单位
* wx：该单位是weex特有的单位，它与像素无关
* px&没有单位：对于没有单位或单位为px的尺寸，Weex会乘上当前屏幕的宽和750的比值，以这种方式来进行适配不同分辨率的屏幕



**霸道的 list cell**

除了 Web 和 Weex 的差异，在 iOS 和 Android 上同样存在细微的差异。Android list 中的 cell，无法展示内部超出的元素。如下图，我们如果要实现 图1的效果，如果直接用绝对定位飘出去，可能在安卓下会被 cell 截断得到图2的效果

![](https://gw.alicdn.com/tfs/TB1cOnwk2DH8KJjy1XcXXcpdXXa-414-219.jpg)

### list

Web 页面天生是可以滚动的，Native 中却不是。于是 Native 中提供了滚动容器来解决。Rax 中的滚动容器有如下几个（对于列表的详细分析这里也不展开，只说 list native 原理部分）

* ScrollView 的 weex 实现是 slider，支持垂直和水平的滚动
* RecyclerView 的 weex 实现是 list，可回收的长列表（此标签下面会举例展开细说）
* ListView 是 RecyclerView 的上层包装，对标 RN 的能力
* WaterFall 底层实现上也是 list 的一个扩展，在 api 能力上向 ListView 靠拢
* TemplateList 的 weex 实现是 recycler-list，是一个基于数据与模版的高性能长列表


**可回收的长列表 RecyclerView**

Rax 的 RecyclerView 是一个高性能的可回收长列表，它的内部实现是 weex 的 list 标签。Weex Android 的 List 的原生实现是 Android RecyclerView 组件，在 iOS 上则使用的是原生的 UITableView。它又一个重要特性就是可以回收非可视区域的 cell，并进行复用。

Android RecyclerView 

在 Android 中，RecyclerView 提供了复用机制来减少内存开销、提升滑动效率，Weex 中 List 也暴露出相应的 API 支持 Cell 复用：设置相同 scopeValue 的 Cell 支持 ViewHolder 复用，这里的 ViewHolder 服用是只重复的数据类型复用，cell 内如果拥有相同的 children 结构，则该类型的 cell 可以复用，滑出可视区域的 cell 会被回收，在内部实现中不通 RecyclerView 的相同结构 cell 也有复用的策略（源码太多不展开，原理参考[这里](https://www.atatech.org/articles/60909#13)以及源码）。

iOS UITableView

UITableView 是一个以行数据概念实现的列表，每一行数据都是一个 UITableViewCell。
为了性能上更优，利用有限的结构动态切换其内容来尽可能减少资源占用，以达到 cell 复用。
UITableView内部有一个缓存池，初始化时使用 initWithStyle:(UITableViewCellStyle) reuseIdentifier:(NSString *) 方法指定一个可重用标识，就可以将这个 cell 放到缓存池。然后在使用时使用指定的标识去缓存池中取得对应的 cell 然后修改 cell 内容即可。以达到滚动时创建的 cell 地址是初始化时已经创建的。（详细不展开，原理在[这里](http://www.cnblogs.com/kenshincui/p/3931948.html)）

### 图片

Web 中我们不指定图片的宽高页面会自动撑开，Weex 中却不会，内部实现的不同导致我们渲染图片的时候必须传入宽高（图片默认高度为0）。虽然我们在图片的 onLoad 事件中可以拿到宽高信息，但此时再设置宽高会产生页面的抖动。在做瀑布流布局时图片的宽高就更加必要了。

另外 Weex 中相比 Web 图片额外做了加载的优化，我们不用考虑 Weex 上的图片懒加载。（[自动化的图片按需加载](https://aone.alibaba-inc.com/task/11057463) 与 [性能优化](http://gitlab.alibaba-inc.com/codev/mp/blob/master/story/itempic.md)）

不能设置背景图，只能使用图片插入到文档中

针对 gif 图片的显示依赖客户端的图片库，手淘环境可以在 attribute 和 style 上设置 quality='original' 解决，这个属性主要是让客户端的图片库不去优化该图片（避免一些 cdn 优化策略在某些 Weex 图片上不适用）

### 事件

Weex 支持的事件类型有限，支持的事件类型见 [通用事件](https://weex-project.io/cn/references/common-event.html)，且不区分事件的捕获阶段和冒泡阶段，相当于 DOM 0 级事件。Appear 事件，Page 事件都是和传统 Web 开发思路有所不同的。


### 内建模块

Weex 为我们提供了许多内建模块：
animation、WebSocket、picker、meta、clipboard、dom、modal、navigator、storage、stream、webview、globalEvent 等等。

这部分是区别于 Web 的一些功能，直接调用移动端设备能力，Rax 中使用内建模块方式如下：

\`\`\`
let dom = require('@weex-module/dom');
dom.getComponentRect('viewport', (e) => {
  console.log(e.result, e.size);
});
\`\`\`


`;