在最底层，Emscripten提供了三种文件系统，分别为：

MEMFS：内存文件系统。该系统的数据完全存储于内存中，程序运行时写入的数据在页面刷新或程序重载后将丢失；
NODEFS：Node.js文件系统。该系统可以访问本地文件系统，可以持久化存储，但只能用于Node.js环境；
IDBFS：IndexedDB文件系统。该系统基于浏览器的IndexedDB对象，可以持久化存储，但只能用于浏览器环境。

# MEMFS/打包文件系统
使用emcc命令时，
--preload-file参数用于以preload模式打包指定文件或文件夹，相对的，
--embed-file参数用于以embed模式打包指定的文件或文件夹。

# NODEFS

# IDBFS

与NODEFS类似，IDBFS的挂接是通过FS.mount()方法完成。
事实上在运行时，IDBFS仍然是使用内存来存储虚拟文件系统，
只不过IDBFS可以通过FS.syncfs()方法进行内存数据与IndexedDB的双向同步，以达到数据持久化存储的目的。
FS.syncfs()是异步操作，因此在上述例子中，读写文件的test()函数必须在FS.syncfs()的回调函数中调用。上述程序在每次刷新页面后，控制台输出的count加1：