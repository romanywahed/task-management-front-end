import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  providers: [TaskService] 
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task = { id: 0, title: '', description: '', status: 'Pending', priority: 'Low', dueDate: '' };
  searchText: string = '';
  statusFilter: string = '';
  priorityFilter: string = '';
  sortColumn: string = '';

  @ViewChild('taskModal') taskModal: any;

  constructor(private taskService: TaskService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  openTaskModal(task?: Task) {
    this.selectedTask = task ? { ...task } : { id: 0, title: '', description: '', status: 'Pending', priority: 'Low', dueDate: '' };
    this.modalService.open(this.taskModal);
  }

  saveTask() {
    if (this.selectedTask.id) {
      this.taskService.updateTask(this.selectedTask).subscribe(() => this.loadTasks());
    } else {
      this.taskService.addTask(this.selectedTask).subscribe(() => this.loadTasks());
    }
    this.modalService.dismissAll();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  markCompleted(task: Task) {
    task.status = 'Completed';
    this.taskService.updateTask(task).subscribe(() => this.loadTasks());
  }

  filterTasks() {
    return this.tasks.filter(task => 
      task.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (!this.statusFilter || task.status === this.statusFilter) &&
      (!this.priorityFilter || task.priority === this.priorityFilter)
    );
  }

  sortBy(column: string) {
    this.sortColumn = column;
//    this.tasks.sort((a, b) => a[column].localeCompare(b[column]));
  }
}

