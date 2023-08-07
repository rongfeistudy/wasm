<!--custom_print.html-->
<script>
Module = {};
Module.print = function(e) {
    alert(e);
}
</script>
<script src="hello.js"></script>

# --pre-js <file>与--post-js <file>。
emcc hello.cc --pre-js pre.js --post-js post.js -o pre_hello_post.js