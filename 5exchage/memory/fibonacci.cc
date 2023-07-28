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
EM_PORT_API(int*) fibonacci(int count) {
	if (count <= 0) return NULL;

	int* re = (int*)malloc(count * 4);
	if (NULL == re) {
		printf("Not enough memory.\n");
		return NULL;
	}

	re[0] = 1;
	int i0 = 0, i1 = 1;
	for (int i = 1; i < count; i++){
		re[i] = i0 + i1;
		i0 = i1;
		i1 = re[i];
	}
	
	return re;
}

EM_PORT_API(const char*) chararr(int count) {
	if (count <= 0) return NULL;

	const char* pc="abcde";
	
	return pc;
}
int result[2];
typedef int arrT[2];
EM_PORT_API(arrT*) filechar() {
	FILE *fp = NULL;
    fp = fopen("test/test2.bin","r");
    int err = fseek(fp, 0, SEEK_END);
    size_t size = ftell(fp);
    err = fseek(fp, 0, SEEK_SET);
    vector<char> contents(size);
    size_t num_read = fread(contents.data(), size, 1, fp);
    result[0] = (int)contents.data();
    result[1] = size;
	return &result;
}
EM_PORT_API(int) get_result_pointer(int* result) {
    return result[0];
}

EM_PORT_API(int) get_result_size(int* result) {
    return result[1];
}
EM_PORT_API(int) charsize(vector<char>* start) {
    printf("你好，世界！ %zu \n", start->size());
	return static_cast<int>(start->size());
}

EM_PORT_API(void) free_buf(void* buf) {
	free(buf);
}