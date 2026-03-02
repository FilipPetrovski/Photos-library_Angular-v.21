import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'pl-photo',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
})
export class PhotoComponent {
  photo = input.required<{ id: number; url: string }>();
  isFavorite = input<boolean>(false);

  toggle = output<number>();

  onToggle() {
    this.toggle.emit(this.photo().id);
  }
}
