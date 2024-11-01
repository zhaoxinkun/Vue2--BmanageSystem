# 实现分页组件的封装思路

## 一  第一次测试

1. 拉取分页器基本模板
2. 拉取包含的事件处理方法
3. 看看那些是要props传递的,那些是别的方式传递的,还有那些是不必的
4. props 在组件中,做好限制条件
5. 第一次传递和使用组件测试

## 二 第二次测试

1. 需要的数据
    - 传递时的名字 组件本身的名字
    - rows     :total="rows"  总条数
    - layout   :layout="layout"  布局
    - SizeArray :page-sizes 分页器的数组
    - pageNO :current-page.sync="curPageNo" 当前页码(需要处理的)
    - curDataSize :page-size.sync="curDataSize" 当前的数据条数(需要处理的)

### props 的数据还可以,rows,layout,SizeArray,都可以直接传递,但是你会发现

### 页数和页吗是变化的.更是和父组件传递的数据实时变化的

### 这时候,就需要我们的.sync 修饰符了,可以和父组件的数据同步,但是要搭配emit事件使用

## 实现步骤

### 一 给两个变化的值,组件上和使用到组件的地方,加上.sync

### 二  两个数据,就不能直接写了,需要computed处理

### 三  computed写为set模式,里边包含触发的方法

### 四  最后,自己的变化函数里触发传递方法
