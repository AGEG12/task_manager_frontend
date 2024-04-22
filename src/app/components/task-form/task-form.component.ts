import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { CategoryService } from '../../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit{
  taskForm: FormGroup;
  taskToUpdate: any = {};
  categories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['pendiente', Validators.required],
      dueDate: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskToUpdate = params;
      this.taskForm.patchValue(this.taskToUpdate);
      this.taskForm.patchValue({categoryId: this.taskToUpdate['category_id']});
      let formatedDate = this.taskToUpdate['due_date'].split("T");
      this.taskForm.patchValue({dueDate: formatedDate[0]});
    });

    this.categoryService.getUserCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (e) => console.error(e)
    })
  }
  
  onSubmit() {   
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      formData.category_id = this.taskForm.value.categoryId;
      formData.due_date = this.taskForm.value.dueDate;
      console.log(formData);
      const taskToUpdateId = this.taskToUpdate['_id'];
      if (taskToUpdateId) {
        this.tasksService.updateTask(formData,taskToUpdateId).subscribe({
          next: (res) => {
            console.log('Tarea creada correctamente:', res);
            this.router.navigate(['/dashboard']);
          },
          error: (e) => console.error('Error al crear tarea:', e)
        })


        console.log('esto debe ser una edición')
      } else {
        this.tasksService.createTask(formData).subscribe({
          next: (res) => {
            console.log('Tarea creada correctamente:', res);
            this.router.navigate(['/dashboard']);
          },
          error: (e) => console.error('Error al crear tarea:', e)
        })
      }
    } else {
      console.error('Formulario inválido');
      // Aquí puedes mostrar un mensaje de error al usuario indicando que complete correctamente el formulario
    }
  } 
}
