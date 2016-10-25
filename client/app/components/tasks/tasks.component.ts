//import { Component } from '@angular/core';
//import { TaskService } from '../../services/task.service';
//import { Task } from '../../interfaces/Task';

//@Component({
//  moduleId: module.id,
//  selector: 'tasks',
//  templateUrl: 'tasks.component.html'
//})

//export class TasksComponent {
//  tasks: Task[];
//  title: string;

//  constructor(private taskService: TaskService) {
//    this.taskService.getTasks()
//      .subscribe(tasks => {
//        this.tasks = tasks;
//      });
//  }

//  addTask(event: Event) {
//    //event.preventDefault();
//    let newTask = {
//      title: this.title,
//      isDone: false
//    }
//    this.taskService.addTask(newTask)
//      .subscribe(response => response.ok ? this.tasks.push(newTask) : console.log(`That didn't work!`));
//  }

//  deleteTask(id: string) {
//    this.taskService.deleteTask(id)
//      .subscribe(data => {
//        if (data.n == 1) {
//          this.tasks.splice(this.tasks.findIndex(task => task._id == id), 1);
//        }
//      })
//  }

//  updateStatus(task: Task) {
//    let _task: Task = {
//      _id: task._id,
//      title: task.title,
//      isDone: !task.isDone
//    };
//    this.taskService.updateStatus(_task)
//      .subscribe(data => {
//        task.isDone = !task.isDone;
//      });
//  }
//}