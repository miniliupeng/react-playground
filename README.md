# 原理
- babel 的浏览器版本 @babel/standalone 编译ts代码为js
- 文件引入通过babel将路径转化为Blob + URL.createBlobURL 生成blob url方式引入  
- 第三方库引入通过import maps + esm.sh引入
- 预览 blob URL传入iframe的src

# 布局 allotment  拖拽调整大小
# 代码编辑器
- ts配置、快捷键配置
- 第三方包类型提示 @typescript/ata   (automatic type acquisition 自动类型获取,传入源码，自动分析出需要的 ts 类型包，然后自动下载)

# 多文件切换