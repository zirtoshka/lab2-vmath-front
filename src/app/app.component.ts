import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GraphComponent} from "./compo/graph/graph.component";
import {HeaderComponent} from "./compo/header/header.component";
import {EquationComponent} from "./compo/equation/equation.component";
import {CamComponent} from "./compo/cam/cam.component";
import {SystemComponent} from "./compo/system/system.component";
import {FilikComponent} from "./compo/filik/filik.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GraphComponent, HeaderComponent, EquationComponent, CamComponent, SystemComponent, FilikComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'labup';
}
