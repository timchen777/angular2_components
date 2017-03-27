// p.73 We can go ahead and bootstrap our Angular application by providing our main application
// component, App. We need to import the bootstrap function from the angular2 module. We can then import 
// our App component and call the bootstrap function, passing it as parameter:

// Import Angular bootstrap function
import {bootstrap} from '@angular/platform-browser-dynamic'; 
// Import our main app component
import {App} from './app';
// We are bootstrapping Angular using our main application
// component
bootstrap(App);