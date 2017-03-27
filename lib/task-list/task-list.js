import {Component, Inject, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
// The template of the task list using the text plugin of SystemJS
import template from './task-list.html!text';

@Component({
  selector: 'ngc-task-list',
  // The host property allows us to set some properties
  // on the HTML element where our component is initialized
  host: {
    class: 'task-list'
  },
  template,
  encapsulation: ViewEncapsulation.None
})
export class TaskList {
  constructor() {
    this.tasks = [
      {title: 'Task 1', done: false},
      {title: 'Task 2', done: true}  
    ];
  }
}
