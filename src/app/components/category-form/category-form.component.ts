import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryDescription: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formData = {
        category_name: this.categoryForm.value.categoryName,
        category_description: this.categoryForm.value.categoryDescription
      }
      console.log(formData);
      this.categoryService.createCategory(formData).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard'])
        },
        error: (e) => console.error(e)
      })
    }
  }
}
