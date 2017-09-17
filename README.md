# Movie---Vue
vue,vuex,vue-router,vux,vue-scroller,vue-jsonp,Muse UI等，移动端APP，API接口数据来自时光网，网易新闻，豆瓣等
# 说明

> 本项目是基于时光网提供的电影和图片等api编写的移动端的app。 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^ 或者您可以 "follow" 一下，我会不断开源更多的有趣的项目 如有问题请直接在 Issues 中提;

# 克隆到本地

```
git clone https://github.com/Jacknode/Movie---Vue.git
```

# 进入文件夹
```
cd Movie---Vue
```

# 安装依赖
```
npm install
或者
yarn install
```
# 运行，自动打开服务器
```
npm run dev
```
# 发布环境
```
npm run build（开发环境不需要执行）
```

# 技术栈
```
vue,vuex,vue-router,vue-jsonp,fetch,muse-ui,webpack,vue-scroller,vux
```


# 项目周期一览
> 1. 多个页面布局，跳转

> 2. 搭建好页面并分配好各个组件和跑通整个流程，

> 3. 开始编写入口文件和路由还有store仓库

> 4. 电影的首页,列表页,详情页的组件和功能，如下
     - loading的显示和隐藏用的vuex
     - vuex 的store 下，存储各组件共享数据，并管理和维护共享数据的更新，修改；分布式管理和统一导出，方便管理和维护
     - routers 放置配置好的路由
     - filters 放置过滤器
     - components 放的是整个项目用到的自定义组件和项目组件
     - assets 是静态资源管理文件
     - 上拉加载更多

> 5. 搜索/search实现了用户搜索功能

> 6. 购票的首页和列表页和详情页的逻辑和一些组件的封装

> 7. 用户登录与注册功能
       - 登录:/login
       - 注册:/register

> 8. 首页，以及预告片/花絮页面，实现上拉加载更多
> 9. 接口获取方式采用fetch，axios,jsonp和后端代理，解决跨域问题


