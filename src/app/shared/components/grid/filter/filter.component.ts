import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput];

@Component({
  selector: 'app-filter',
  imports: [FormsModule, MATERIAL_MODULES],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  filter = model('');
  label = input<string>('Filter');
  placeholder = input<string>('Ex. name');
}
