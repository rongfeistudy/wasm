2.4节我们提到，JavaScript调用C/C++时只能使用Number作为参数，因此如果参数是字符串、数组等非Number类型，则需要拆分为以下步骤：

使用Module._malloc()在Module堆中分配内存，获取地址ptr；
将字符串/数组等数据拷入内存的ptr处；
将ptr作为参数，调用C/C++函数进行处理；
使用Module._free()释放ptr。
由此可见调用过程相当繁琐，尤其当非Number参数个数较多时，JavaScript侧的调用代码会急剧膨胀。为了简化调用过程，Emscripten提供了ccall/cwrap封装函数。