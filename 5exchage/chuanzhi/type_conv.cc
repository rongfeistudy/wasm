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
// input 会取整
EM_PORT_API(void) print_int(int a) {
	printf("C{print_int() a:%d}\n", a);
}
// float 会损失精度
EM_PORT_API(void) print_float(float a) {
	printf("C{print_float() a:%f}\n", a);
}

EM_PORT_API(void) print_double(double a) {
	printf("C{print_double() a:%lf}\n", a);
}