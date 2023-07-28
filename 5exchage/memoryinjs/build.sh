emcc sum.cc -o sum.js -s 'EXPORTED_FUNCTIONS=["_malloc", "_free"]'  -s ALLOW_MEMORY_GROWTH
