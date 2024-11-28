import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ModalService } from './modal/modal.service';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { ModalComponent } from './modal/modal.component';
import { APP_CONSTANTS } from '@shared/constants';
import { UserService } from '@pages/user/user.service';
import { FilterComponent } from './filter/filter.component';
import { CpfPipe } from '@shared/pipes/cpf.pipe';

const MATERIAL_MODULES = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
];

@Component({
  selector: 'app-grid',
  imports: [FilterComponent, CpfPipe, MATERIAL_MODULES],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent<T> implements OnInit {
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  sortableColumns = input<string[]>([]);

  columNames: Record<string, any> = APP_CONSTANTS.COLUMNS_NAME;

  dataSource = new MatTableDataSource<T>();
  valueToFilter = signal('');

  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);
  private readonly _userSvc = inject(UserService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackBar = inject(SnackBarService);

  constructor() {
    effect(
      () => {
        if (this.valueToFilter()) {
          this.dataSource.filter = this.valueToFilter();
        } else {
          this.dataSource.filter = '';
        }

        if (this.data()) {
          this.dataSource.data = this.data();
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort();
    this.dataSource.paginator = this._paginator();
  }

  openEditForm(data: T): void {
    this._modalSvc.openModal<ModalComponent, T>(ModalComponent, data, true);
  }

  selectedRow(data: T): void {
    this.openEditForm(data);
  }

  deleteUser(id: string): void {
    const confirmation = confirm(APP_CONSTANTS.MESSAGES.CONFIRMATION_PROMPT);

    if (confirmation) {
      this._userSvc.deleteUser(id);
      this._snackBar.showSnackBar(APP_CONSTANTS.MESSAGES.USER_DELETED);
    }
  }
}
