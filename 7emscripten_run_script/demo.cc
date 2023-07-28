const char* get_js_code(){
	static char buf[1024];
	sprintf(buf, "console.log('你好，Emscripten！');");
	return buf;
}

int main(){
    // emscripten_run_script()可以接受动态生成的字符串，例如：
	emscripten_run_script(get_js_code());
    // 由于传入的脚本最终会通过JavaScript的eval()方法执行，因此传入的脚本可以是任意的JavaScript代码，比如：
    emscripten_run_script(R"(
		function my_print(s) {
			console.log("JS:my_print():", s);
		}
		my_print("Hello!");
	)");
    // emscripten_run_script_int
    // 该函数与emscripten_run_script()类似，区别是它会将输入的脚本的执行结果作为整型数返回，例如：
    int num = emscripten_run_script_int(R"(
		function show_me_the_number() {
			return 13;
		}
		show_me_the_number();
	)");
	printf("num:%d\n", num);
    // emscripten_run_script_string
    // 该函数与emscripten_run_script_int()类似，区别是返回值为字符串，例如：
    const char* str = emscripten_run_script_string(R"(
		function show_me_the_answer() {
			return "The answer is 42.";
		}
		show_me_the_answer();
	)");
	printf("%s\n", str);
	return 0;
}