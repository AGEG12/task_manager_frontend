import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  filterForm: FormGroup;
  categories: any[] = [];
  tasks: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private tasksService: TasksService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.filterForm = this.formBuilder.group({
      categoryId: ['all', Validators.required],
      status: ['all', Validators.required],
      sortBy: ['nearest', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.getUserData().subscribe({
      next: (userData) => {
        this.categories = userData.userCategories;
        this.tasks = userData.userTasks;
        this.tasks.forEach(task => {
          this.categoryService.getCategoryById(task.category_id).subscribe({
            next: (category) => {
              task.category_name = category.category_name;
            },
            error: (e) => console.error(e)
          })
        });
      },
      error: (e) => console.error(e)
    })
  }


  deleteTask(taskId: string) {
    this.tasksService.deleteTask(taskId).subscribe({
      next: (res) => {
        console.log(res);
        this.onSubmit()
      },
      error: (e) => console.error(e)
    })
  }
  fillFormEdit(taskId: string) {
    this.tasksService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.router.navigate(['/taskform', task]);
      },
      error: (e) => console.error(e)
    })
  }

  onSubmit() {
    const formData = this.filterForm.value;
    console.log(formData);
    this.tasksService.filterAndSortTasks(formData).subscribe({
      next: (filteredTasks) => {
        this.tasks = filteredTasks;
        this.tasks.forEach(task => {
          this.categoryService.getCategoryById(task.category_id).subscribe({
            next: (category) => {
              task.category_name = category.category_name;
            },
            error: (e) => console.error(e)
          })
        });
      },
      error: (e) => console.error(e)
    })
  }
}
