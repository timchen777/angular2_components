==========cMastering	Angular2 Components.pdf ===============
REF:http://ebook-dl.com/book/4538
https://github.com/PacktPublishing/Mastering-Angular-2-Components
1. Once you've	installedNode.js,Open a terminal console and execute command: 
> node	-e	"console.log('Hello	World');"
2. ------- p.61-------------------------	
> npm install -g jspm live-server
> npm install jspm --save-dev
> jspm init ( hit ENTER, and choose transpiler: TypeScript)
created jspm_packages/system.js and config.sys, then we
3. --------------------------------------
-> Create index.html:
<!doctype html>
<script src="jspm_packages/system.js"></script>
<script src="config.js"></script>
<script>
  System.import('main.js');
</script>
4.-----------------------------------------
> jspm install jquery
5.-----------------------------------------
->create main.js
import $ from 'jquery';
class HelloWorld {
  constructor() {
    $(document.body).append('<h1>Hello World!</h1>');
  }
}
const helloWorld = new HelloWorld();
6.-----------------------------------------
> live-server
Browser http://127.0.0.1:8080/ see "Hello World!""
Now we have a working example with ECMAScript 6
and SystemJS using the TypeScript transpiler. 
Using LiveReload, your browser should
automatically open and display our Hello World application
