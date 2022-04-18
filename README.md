
## **项目简介**:  
平台内置大量Echart图表，可以使用现有的图表进行拖拽编辑，生成一个单页大屏项目，支持导出，生成独立的大屏（不依赖于平台）。单图表支持背景色、背景图、大小、API接口（支持定时刷新），大屏页面同样支持背景、尺寸等高度自定义样式。图表除了内置的图表外，可以自定义编写上传，支持在线编写已经在现有的图表基础之上进行修改。

## 技术栈：

**前端**：vue3 + ts + ANTV 

选择vue3 + ts是为了应用最新的技术进行学习，对vue3的特性不阐述了



**后端**：Egg + mysql + redis + aliOSS

项目本身体量不大只是作为个人学习的一个途径，这里使用个人比较常用的Node的框架，redis是考虑后面大量图表需要实时读取这里作为备用，AliOSS 用来存储图片等静态资源，为后期配置CDN做准备。每个图表本身都是实时渲染的（只存储图表的js代码（string），这里已经做了验证，一般文件大小不超过kb级别），不需要将图表的静态文件存储在服务器所以不需要Mongodb等非关系型数据库。



### 一阶段：

实现基本的核心的功能点

1. 实现图表在线编辑基本功能，可以实时修改图表并保存。
2. 实现大屏编辑器的基本功能：图表拖拽布局、图表参数设置、大屏页面样式设置
3. 实现大屏保存（线上保存/本地导出）



#### 进度：

**2022/4/13**: 完成大屏编辑器基本页面布局, 图表拖拽功能，大屏页面大小、背景图、背景色编辑功能；完成图表在线编辑基本功能（编辑过程中存在bug）

功能点：画布图表拖拽：[Moveable](https://daybrush.com/moveable/)插件、取色组件[vue3-colorpicker、](https://www.npmjs.com/package/vue3-colorpicker)uid插件: [uuid、](https://www.npmjs.com/package/uuid)代码在线编辑器：[codemirror](https://codemirror.net/)

![](https://img-blog.csdnimg.cn/img_convert/094c344766eedf3326a5966f5359efd6.png)

![](https://img-blog.csdnimg.cn/img_convert/9b8db01649bd91b74c3fffbece600fc1.png)



![](https://img-blog.csdnimg.cn/img_convert/48f4443960c4f360a781190ffe9833dc.png)

**2022/4/18**:新增登录页面;修改视图编辑器参数设置布局;新增视图保存功能;新增视图预览
![登录页面](https://img-blog.csdnimg.cn/89a3cf5bcc8f4e36ac0b7fac39b4287e.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBASGVsc29uQA==,size_20,color_FFFFFF,t_70,g_se,x_16)
视图编辑
![视图编辑](https://img-blog.csdnimg.cn/cef32e3c4dde4f6e931c55e9d1e189f6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBASGVsc29uQA==,size_20,color_FFFFFF,t_70,g_se,x_16)

视图预览![视图预览](https://img-blog.csdnimg.cn/b50759ed202e44359a211c5a4484a457.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBASGVsc29uQA==,size_20,color_FFFFFF,t_70,g_se,x_16)
图表在线开发
![图表在线开发](https://img-blog.csdnimg.cn/f351dc3664c14b968139324660509e0a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBASGVsc29uQA==,size_20,color_FFFFFF,t_70,g_se,x_16)
