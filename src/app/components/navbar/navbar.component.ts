import { Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PhotoService } from '../../features/photos-library/services/photo.service';

@Component({
  selector: 'pl-navbar',
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatDividerModule, MatBadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private photoService = inject(PhotoService);

  readonly favoriteCount = this.photoService.favoritePhotosCount;
}
