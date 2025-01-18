import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import 'animate.css';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practica-cminvi';
}
