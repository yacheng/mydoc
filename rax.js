window.raxdoc = `

# Rax 实践教程(开源版)

本文以初学者视角，从简单入门开始，串一下 Rax 使用上的问题。本文只涉及开源仓库所提供的能力，内部 API 不做讲解。阅读受众是前端以及有部分前端基础的客户端同学，Weex 技术体系的开发人员。

本文不是文档，而是上层实践，篇幅较长。如果需要查阅文档，可以移步这里 [Rax 官网](https://github.com/alibaba/rax)。相关配套： [Rax 组件示例](https://jsplayground.taobao.org/album?name=RaxComponent)、[Rax API 示例](https://jsplayground.taobao.org/album?name=RaxFrameworkApi)、[在线编码尝试](https://jsplayground.taobao.org/raxplayground) 


## <a id="l1" ></a> Hello World 

先写一个简单的例子，简单了解一下。

```
import {createElement, Component, render} from 'rax';
import Text from 'rax-text';
import View from 'rax-view';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hello Rax
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#efefef'
  }
};

render(<App />);
```

是不是和 React 很像，如果你学习过 React，那你将会很快上手。

## <a id="l2" ></a> 什么是 Rax 

Rax 是一个高性能、轻量级、跨容器的渲染引擎，支持 Web 浏览器、Weex、WebGL、小程序、Node.js。  
源自淘宝的开源项目 [https://github.com/alibaba/rax](https://github.com/alibaba/rax) 是一个 Weex 上层的两大 DSL 之一。

![](https://gw.alicdn.com/tfs/TB1CU6ofb_I8KJjy1XaXXbsxpXa-867-203.jpg)

与 React 在语法层面一致，但也有部分区别

* Rax 没有 createClass() 方法
* Rax setState() 是同步的, React setState 是异步的
* Rax 的 findDOMNode() 方法可以接收字符串类型的 id
* Rax 的 PropTypes 只是 React 的接口兼容

![](https://gw.alicdn.com/tfs/TB1xFm0fm_I8KJjy0FoXXaFnVXa-692-345.jpg)

JSX

生命周期

通用事件







`;