//import { Injectable } from '@angular/core';
//import { Http, Headers } from '@angular/http';
//import 'rxjs/add/operator/map';

//import { Task } from '../interfaces/Task';

//@Injectable()
//export class TaskService {
//  constructor(private http: Http) {
//    console.log('Task service initialized')
//  }

//  getTasks() {
//    return this.http.get('/api/tasks')
//      .map(res => res.json());
//  }

//  addTask(newTask: Task) {
//    let headers = new Headers();
//    headers.append('Content-Type', 'application/json');
//    return this.http.request('/api/task', {
//      method: 'POST',
//      body: newTask,
//      headers: headers
//    })
//      .map(res => res);
//  }

//  deleteTask(id: string) {
//    return this.http.delete(`/api/task/${id}`)
//      .map(res => res.json());
//  }

//  updateStatus(task: Task) {
//    let headers = new Headers();
//    headers.append('Content-Type', 'application/json');
//    return this.http.request(`/api/task/${task._id}`, {
//      method: 'PUT',
//      body: task,
//      headers: headers
//    })
//      .map(res => res);
//  }
//}