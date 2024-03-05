import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputTextModule} from "primeng/inputtext";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [
    ButtonModule,
    InputGroupAddonModule,
    InputTextModule,
    MatRadioButton,
    MatRadioGroup,
    NgIf,
    PaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './system.component.html',
  styleUrl: './system.component.css'
})
export class SystemComponent {
  systemFrom: FormGroup;
  private appService = inject(AppService);


  @Output() choseEvent = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder) {
    this.systemFrom = formBuilder.group({
      "inaccuracy": ["0.1", [Validators.required,
        Validators.max(0.1),
        Validators.min(0),
        Validators.pattern('-?\\d+([\\.,]\\d+)?')]],
      "initialApproximationByX": ["0", [Validators.required,
        Validators.pattern('-?\\d+([\\.,]\\d+)?')]],
      "initialApproximationByY": ["0", [Validators.required,
        Validators.pattern('-?\\d+([\\.,]\\d+)?')]], //'\\d+(\\.|,\\d+)?'
      "system": ["", [Validators.required]],
      "method": ["1", [Validators.required]]
    });
  }

  onRadioChange(event: number) {
    this.choseEvent.emit(event)

  }


  submit() {
    this.appService.systemMake(this.systemFrom.value.system,
      this.systemFrom.value.method,
      this.systemFrom.value.initialApproximationByX,
      this.systemFrom.value.initialApproximationByY,
      this.systemFrom.value.inaccuracy).subscribe({
        next: (response) => {
          alert("корень = " + response.uknownX + "   значение функции = " + response.fun);
          console.log(response);
        },
        error: (error) => {
          if (error.status === 400) {
            alert(error.error);
          } else {
            console.error(error);
          }
        }
      }
    );
  }
}
