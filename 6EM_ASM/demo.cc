#include <emscripten.h>
#include <stdio.h>
#include <math.h>

int main() {
	EM_ASM(console.log('你好，Emscripten！'));
    EM_ASM(var k = 42;console.log('The answer is:', k););
    EM_ASM(
		var k = 42;  //define k
		console.log('The answer is:', k);
	);
    // EM_ASM_支持输入数值类型的可变参数, 同时返回整数类型的结果
    int sum = EM_ASM_({return $0 + $1 + $2;}, 1, 2, 3);
	printf("sum(1, 2, 3): %d\n", sum);
    // 使用EM_ASM_宏嵌入JavaScript时，参数不仅可以是常数，也可以是变量，例如：
    char buf[32];
	double pi = 3.14159;
	EM_ASM_(
		{
			console.log('addr of buf:', $0);
			console.log('sqrt(pi):', $1);
		},
		buf, sqrt(pi)
	);
    // EM_ASM_DOUBLE用法与EM_ASM_基本一致，区别是EM_ASM_DOUBLE返回值为double。例如：
    double pi2 = EM_ASM_DOUBLE(
		{
			return $0 * $1;
		},
		pi, 2.0
	);
	printf("pi2: %lf\n", pi2);
    // EM_ASM_/EM_ASM_DOUBLE宏中嵌入的JavaScript代码会被展开为一个独立的JavaScript方法，因此在嵌入的JavaScript中除了用$n之外，也可以用内置的arguments对象来访问参数，例如：
    EM_ASM_(
		{
			console.log('arguments count:', arguments.length);
			for(var i = 0; i < arguments.length; i++) {
				console.log('$', i, ':', arguments[i]);
			}
		},
		42, 13
	);
    // EM_ASM_INT_V/EM_ASM_DOUBLE_V
    // 如果嵌入的JavaScript代码不需要参数，可以使用EM_ASM_INT_V/EM_ASM_DOUBLE_V宏。由于没有参数，嵌入的代码无需用{}包围，例如：
    int answer = EM_ASM_INT_V(return 42);
	printf("The answer is:%d\n", answer);
	double pi_js = EM_ASM_DOUBLE_V(return 3.14159);
	printf("PI:%lf\n", pi_js);

	return 0;
}