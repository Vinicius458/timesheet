import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { APP_CONSTANTS } from '@shared/constants';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { TimesheetService } from './timesheet.service';

const MATERIAL_MODULES = [
  MatLabel,
  MatFormField,
  MatInput,
  MatDialogModule,
  MatButtonModule,
  NgxMaskDirective,
];

@Component({
  selector: 'app-timesheet',
  imports: [ReactiveFormsModule, MATERIAL_MODULES],
  providers: [provideNgxMask()],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss',
})
export class TimesheetComponent implements OnInit {
  userForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);

  private readonly _timesheetSvc = inject(TimesheetService);
  private readonly _snackBar = inject(SnackBarService);

  ngOnInit(): void {
    this._buildForm();
  }

  async onSubmit(): Promise<void> {
    let messageSnackBar: string;
    const userCode = this.userForm.value.userCode;

    this._timesheetSvc.registerPoint(userCode).subscribe({
      next: (message) => {
        messageSnackBar = message;
        this._snackBar.showSnackBar(messageSnackBar);
        this.userForm.reset();
      },
      error: (error) => {
        messageSnackBar = error;
        this._snackBar.showSnackBar(messageSnackBar);
      },
    });
  }
  private _buildForm(): void {
    this.userForm = this._fb.nonNullable.group({
      userCode: ['', Validators.required],
    });
  }
}
