import { Component } from '@angular/core';
import { BaseLayoutComponent } from './components/layouts/base-layout/base-layout.component';

@Component({
  selector: 'pl-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [BaseLayoutComponent],
})
export class App {}
