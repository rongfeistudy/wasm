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

typedef int arrT[2];
EM_PORT_API(int*) filechar() {
    int* result = new int[3];
	FILE *fp = NULL;
    fp = fopen("assets/Prefabs.meta","r");
    int err = fseek(fp, 0, SEEK_END);
    size_t size = ftell(fp);
    err = fseek(fp, 0, SEEK_SET);
    vector<char> contents(size);
    size_t num_read = fread(contents.data(), size, 1, fp);
    result[0] = (int)contents.data();
    result[1] = size;
    
	return result;
}
EM_PORT_API(void) readFile() {
	FILE *fp = NULL;
    fp = fopen("assets/imgs/test1.png","r");
    fseek(fp, 0, SEEK_END);
    size_t file_size = ftell(fp);
    fseek(fp, 0, SEEK_SET);
    // vector<char> contents(file_size);
    // char *buffer = new char(file_size);
    // size_t num_read = fread(buffer, file_size, 1, fp);
    char* buffer = new char[file_size];
    size_t bytes_last_read = 0;  // # of bytes read in the last fread()
    size_t bytes_read = 0;       // # of bytes read so far
    fseek(fp, 0, SEEK_SET);
    do {
        bytes_last_read =
            fread(buffer + bytes_read, 1, file_size - bytes_read, fp);
        bytes_read += bytes_last_read;
    } while (bytes_last_read > 0 && bytes_read < file_size);
    EM_ASM_(
		{
			window.test1($0, $1);
		},
		buffer,
        file_size
	);
    delete[] buffer;
    fclose(fp);
}
