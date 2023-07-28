#ifndef EM_PORT_API
#	if defined(__EMSCRIPTEN__)
#		include <emscripten.h>
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#		else
#			define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#		endif
#	else
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype
#		else
#			define EM_PORT_API(rettype) rettype
#		endif
#	endif
#endif

#include <stdio.h>
#include <malloc.h>
#include <vector>
using namespace std;

EM_PORT_API(double) add(double a, int b) {
	return a + (double)b;
}
// ccall
// 语法：
// var result = Module.ccall(ident, returnType, argTypes, args);
// ccall的优势在于可以直接使用字符串/Uint8Array/Int8Array作为参数。
//ccall_wrap.cc
EM_PORT_API(void) print_string(const char* str) {
	printf("C:print_string(): %s\n", str);
}

//ccall_wrap.cc
EM_PORT_API(int) sum(uint8_t* ptr, int count) {
	int total = 0, temp;
	for (int i = 0; i < count; i++){
		memcpy(&temp, ptr + i * 4, 4);
		total += temp;
	}
	return total;
}

// 如果C导出函数返回了无需释放的字符串（静态字符串，或存放在由C代码自行管理的地址中的字符串），在JavaScript中使用ccall调用，亦可直接获取返回的字符串，例如：
//ccall_wrap.cc
EM_PORT_API(const char*) get_string() {
	const static char str[] = "This is a test.";
	return str;
}

// cwrap
// ccall虽然封装了字符串等数据类型，但调用时仍然需要填入参数类型数组、参数列表等，为此cwrap进行了进一步封装：
// var func = Module.cwrap(ident, returnType, argTypes);