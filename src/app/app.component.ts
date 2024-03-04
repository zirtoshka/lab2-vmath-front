import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GraphComponent} from "./compo/graph/graph.component";
import {HeaderComponent} from "./compo/header/header.component";
import {EquationComponent} from "./compo/equation/equation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GraphComponent, HeaderComponent, EquationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'labup';
}
