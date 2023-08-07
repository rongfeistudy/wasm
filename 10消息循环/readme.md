emscripten_set_main_loop()
函数声明：

void emscripten_set_main_loop(em_callback_func func, int fps, int simulate_infinite_loop)

参数：

func：消息处理回调函数。
fps：消息循环的执行帧率。如果该参数小等于0，则使用页面的requestAnimationFrame机制调用消息处理函数，该机制可以确保页面刷新率与显示器刷新率对齐，对于需要执行图形渲染任务的程序，使用该机制可以得到平滑的渲染速度。
simulate_infinite_loop：是否模拟“无限循环”，用法后续介绍。

无论simulate_infinite_loop参数是否为1，消息处理函数都会按照设定的帧率无限执行，区别仅在于，当其为1时：

emscripten_set_main_loop后续代码不执行。
main()函数栈未销毁。