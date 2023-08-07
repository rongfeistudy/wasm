# 在使用emcc编译时，可以使用TOTAL_MEMORY参数控制内存容量，例如：

emcc mem.cc -s TOTAL_MEMORY=67108864 -o mem.js
TOTAL_MEMORY=67108864

# 相应的，栈容量可以通过TOTAL_STACK参数控制，例如下列命令将栈容量设为3MB：

emcc mem.cc -s TOTAL_STACK=3145728 -o mem.js

# 可变内存
emcc mem.cc -s ALLOW_MEMORY_GROWTH=1 -o mem.js

可变内存虽然提供了很多便利，但当编译目标为asm.js时，可变内存模式会影响性能。
然而可扩容的内存是WebAssembly的自有特性，当编译目标为wasm时，使用可变内存模式非常高效，不会影响运行性能，因此在编译为WebAssembly时，可变内存是推荐用法。