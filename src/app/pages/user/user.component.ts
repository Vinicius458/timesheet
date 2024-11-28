import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GridComponent } from '@shared/components/grid/grid.component';
import { ColumnKeys, User } from './user.interface';
import { UserService } from './user.service';
import { tap } from 'rxjs';
import { ModalService } from '@shared/components/grid/modal/modal.service';
import { ModalComponent } from '@shared/components/grid/modal/modal.component';

const MATERIAL_MODULES = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'app-user',
  imports: [GridComponent, HeaderComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  users = signal<User[]>([]);

  displayedColumns: ColumnKeys<User> = [
    'id',
    'name',
    'cpf',
    'email',
    'userCode',
    'action',
  ];
  sortables: ColumnKeys<User> = ['id', 'name', 'cpf', 'email', 'userCode'];

  private readonly _userSvc = inject(UserService);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _modalSvc = inject(ModalService);

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this._userSvc
      .getAllUsers()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((users: User[]) => this.users.set(users))
      )
      .subscribe();
  }

  onClickNewUser(): void {
    this._modalSvc.openModal<ModalComponent>(ModalComponent);
  }
}
