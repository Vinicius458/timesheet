import { Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '@core/auth/auth.service';
const MATERIAL_MODULES = [MatToolbarModule, MatIconModule, MatButtonModule];
@Component({
  selector: 'app-header',
  imports: [MATERIAL_MODULES],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  loginService = inject(AuthService);
  onNewUserEvent = output<void>();

  emitClick(): void {
    this.onNewUserEvent.emit();
  }

  public logout(): void {
    this.loginService.signOutFirebase();
  }
}
