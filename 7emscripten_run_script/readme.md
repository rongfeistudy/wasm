2.5介绍的EM_ASM系列宏只能接受硬编码常量字符串，而本节将要介绍的emscripten_run_script系列函数可以接受动态输入的字符串，该系列辅助函数可以类比于JavaScript中的eval()方法。