==========cMastering	Angular2 Components.pdf ===============
REF:http://ebook-dl.com/book/4538
https://github.com/PacktPublishing/Mastering-Angular-2-Components
1. Once you've	installedNode.js,Open a terminal console and execute command: 
> node	-e	"console.log('Hello	World');"
2. ------- p.61-------------------------	
> npm init
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
========== p.65 Chapter2: Task Management Application ===========
-Bootstrapping an Angular application using a main component
-Component input and output
-Host property binding
-Styling and view encapsulation
-Importing HTML templates using the SystemJS text loader
-Using EventEmitter to emit custom events
-Two-way data binding
-Component life cycle
core features of our application:
Managing tasks within multiple projects and providing a project overview
Simple scheduling as well as a time-and-effort-tracking mechanism
Overviewing the dashboard using graphical charts
Tracking activities and providing a visual audit log
A simple commenting system that would work across different components
7.----------------------------------------------------------
>jspm install npm:@angular/core npm:@angular/common npm:@angular/compiler
npm:@angular/platform-browser-dynamic npm:rxjs text
The package.json file is our Node.js configuration file that we're using as the base to work
with JSPM (the package manager) and SystemJS (the module loader with transpiler).
8. p.70 create main component app.js within a new lib folder in our project folder.
9. p.72 As this component is now relying on a template to be loaded from the file system, we need to
create the app.html file in the lib folder with some initial content:
10. Now that we have created our main application component, we can add the component's host
element " <ngc-app></ngc-app> "to our index.html file .
11. p.73 We can go ahead and bootstrap our Angular application by providing our main application
component, App. We need to import the bootstrap function from the angular2 module. We can then import 
our App component and call the bootstrap function, passing it as parameter:
create lib/bootstrap.js file :
--------------------------------------
// Import Angular bootstrap function
import {bootstrap} from '@angular/platform-browser-dynamic'; 
// Import our main app component
import {App} from './app';
// We are bootstrapping Angular using our main application
// component
bootstrap(App);s
-------------------------------------------------------------
12. create lib/app.scss
13. Running the application
The code we've produced so far should now be in a state where we can run it. Before we run
our code using the live-server module, let's ensure we have all the files ready. At this stage,
our directory should look something like this:
angular-2-components
├── jspm_packages/
├── node_modules/
├── config.js
├── index.html
├── lib
│   ├── app.html
│   ├── app.js
│   └── bootstrap.js
└── package.js
Now let's start live server to start a server and a browser with live reload
> live-server
if everything goes well, http://127.0.0.1:8080 shows Hello Chapter2!
???? Not working, didn't bootstrap app ?????
