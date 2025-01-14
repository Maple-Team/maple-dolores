# 基于 garfish 微前端的个人前端应用集合

## Apps

- [Vue3 App](./packages/admin/), 技术栈：garfish + vite@3 + Vue@3 + ant-design-vue@3 + @tanstack/vue-query@4 + tailwindcss@3
- [React18 App](./packages/react18-webpack/)

## Resources

- [garfish-demo](https://stackblitz.com/edit/garfish-demo-3twzps)

## dev

### vite

- base 提供资源绝对路径，避免相对路径带来的资源访问问题；
- origin 提供资源绝对路径，避免相对路径带来的资源访问问题；
- 需要将子应用沙箱关闭 Garfish.run({ apps: [{ ..., sandbox: false }] })
- 子应用的副作用将会发生逃逸，在子应用卸载后需要将对应全局的副作用清除

### Webpack

- `libraryTarget` 需要配置成 `umd` 规范；
- `globalObject` 需要设置为 `'window'`，以避免由于不规范的代码格式导致的逃逸沙箱；
- 如果你的 `webpack` 为 `v4` 版本，需要设置 `jsonpFunction` 并保证该值唯一（否则可能出现 webpack chunk 互相影响的可能）。若为 `webpack5` 将会直接使用 `package.json` `name` 作为唯一值，请确保应用间的 `name` 各不相同；
- `publicPath` 设置为子应用资源的绝对地址，避免由于子应用的相对资源导致资源变为了主应用上的相对资源。这是因为主、子应用处于同一个文档流中，相对路径是相对于主应用而言的
- `'Access-Control-Allow-Origin'`: `'*'` 允许开发环境跨域，保证子应用的资源支持跨域。另外也需要保证在上线后子应用的资源在主应用的环境中加载不会存在跨域问题（也需要限制范围注意安全问题）； :::

### 自定义导出函数

```js
// provider 写法：
export const provider = (props) => {
  const root = getRootDom(props)
  _root = root
  _props = props

  return {
    render() {
      window?.Garfish.channel.on('stateChange', render)
      ReactDOM.render(<RootComponent {...props} />, root)
    },
    destroy({ dom }) {
      window?.Garfish.channel.removeListener('stateChange', render)
      ReactDOM.unmountComponentAtNode(dom ? dom.querySelector('#root') : document.querySelector('#root'))
    },
  }
}
```

## Terminology

- sandbox
- 框架原理

## Deploy

```sh
docker build . --tag maple/react-18:latest
docker-compose up -d
```
