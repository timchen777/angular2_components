// We need the Component annotation as well as the ViewEncapsulation enumeration
import {Component, ViewEncapsulation} from '@angular/core';

// p.71 we didn't write the HTML template directly within the 
// JavaScript file inside the ECMAScript 6 template strings. Instead, we're going to load the
// template into a JavaScript string using the text loader plugin in SystemJS. We can just load
// any text file from the file system by appending !text to our regular ECMAScrip
// Using the text loader we can import our template
import template from './app.html!text';

// Our application is relying on the TaskList directive
import {TaskList} from './task-list/task-list';

// This creates our main application component
@Component({
  // Tells Angular to look for an element <ngc-app> to create this component
  selector: 'ngc-app',
  // Let's use the imported HTML template string
  template,
  // p.71 using ViewEncapsulation to specify how Angular should handle view encapsulation. Angular has three ways, 
  // to handle view encapsulation, which provides different levels of granularity and has their own pros and cons
  // ViewEncapsulation.Emulated,ViewEncapsulation.Native, and ViewEncapsulation.None
  // Tell Angular to ignore view encapsulation
  encapsulation: ViewEncapsulation.None
})
export class App {}
