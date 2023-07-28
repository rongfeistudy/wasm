# JavaScript与C交换数据

## 2.4.1 参数及返回值
在之前章节的例程中，我们有意忽略了一个基础性的问题：JavaScript与C/C++相互调用的时候，参数与返回值究竟是如何传递的？

### Number从JavaScript传入C/C++有两种途径：

JavaScript调用了带参数的C导出函数，Number通过参数传入；
C调用了由JavaScript实现的函数（见2.2），Number通过注入函数的返回值传入。