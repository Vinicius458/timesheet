import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ModalService } from './modal.service';
import { UserService } from '@pages/user/user.service';
import { APP_CONSTANTS } from '@shared/constants';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

const MATERIAL_MODULES = [
  MatLabel,
  MatFormField,
  MatInput,
  MatDialogModule,
  MatButtonModule,
  NgxMaskDirective,
];

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, MATERIAL_MODULES],
  providers: [provideNgxMask()],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  userForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _userSvc = inject(UserService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackBar = inject(SnackBarService);

  ngOnInit(): void {
    this._buildForm();
    this.userForm.patchValue(this._matDialog.data);
  }

  async onSubmit() {
    let message: string;
    const user = this.userForm.value;

    if (this._matDialog.data) {
      this._userSvc.updateUser(this._matDialog.data.id, user);
      message = APP_CONSTANTS.MESSAGES.USER_UPDATED;
      this._snackBar.showSnackBar(message);
      this._modalSvc.closeModal();
    } else {
      try {
        message = await this._userSvc.verifyAndCreateUser(user);
        this._modalSvc.closeModal();
      } catch (err) {
        message = err as string;
      }

      this._snackBar.showSnackBar(message);
    }
  }

  getTitle(): string {
    return this._matDialog.data ? 'Editar Usuário' : 'Adicionar Usuário';
  }

  private _buildForm(): void {
    this.userForm = this._fb.nonNullable.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.email],
      userCode: ['', Validators.required],
    });
  }
}
