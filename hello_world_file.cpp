// Copyright 2012 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.
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
#include <string>
using namespace std;
void readFile(string filename) {
  string s1 = "test/";
  string s = s1 + filename;
  int length = s.length();

  // declaring character array (+1 for null terminator)
  char* char_array = new char[length + 1];

  // copying the contents of the
  // string to char array
  strcpy(char_array, s.c_str());

  FILE *file = fopen(char_array, "rb");
  if (!file) {
    printf("cannot open file\n");
  }
  while (!feof(file)) {
    char c = fgetc(file);
    if (c != EOF) {
      putchar(c);
    }
  }
  fflush(stdin);
  fclose (file);
}
size_t GetFileSize(FILE* file) {
  fseek(file, 0, SEEK_END);
  return static_cast<size_t>(ftell(file));
}
EM_PORT_API(char* ) show_me_the_answer() {
  FILE *file = fopen("test/11.ts","rb");
  const size_t file_size = GetFileSize(file);
  char* buffer1 = new char[file_size];
  size_t bytes_last_read = 0;  // # of bytes read in the last fread()
  size_t bytes_read = 0;       // # of bytes read so far
  
  fseek(file, 0, SEEK_SET);
  
  do {
      bytes_last_read =
          fread(buffer1 + bytes_read, 1, file_size - bytes_read, file);
      bytes_read += bytes_last_read;
  } while (bytes_last_read > 0 && bytes_read < file_size);
	return buffer1;
}

EM_PORT_API(float) add(float a, float b) {
	return a + b;
}
int main() {
  readFile("hello_world_file.txt");
  readFile("11.ts");
  readFile("dd.ts");
  return 0;
}

