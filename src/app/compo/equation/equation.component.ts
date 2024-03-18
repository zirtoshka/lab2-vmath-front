import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import formatters from "chart.js/dist/core/core.ticks";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputNumberModule} from "primeng/inputnumber";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {AppService} from "../../app.service";
import {NgIf} from "@angular/common";
import {max} from "rxjs";

@Component({
  selector: 'app-equation',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatLabel,
    MatSelect,
    MatOption,
    MatFormField,
    MatRadioGroup,
    MatRadioButton,
    ReactiveFormsModule,
    InputGroupAddonModule,
    InputNumberModule,
    ButtonModule,
    InputTextModule,
    NgIf
  ],
  templateUrl: './equation.component.html',
  styleUrl: './equation.component.css'
})
export class EquationComponent {
  equationsFrom: FormGroup;
  @Output() choseEvent = new EventEmitter<number>();
  private appService = inject(AppService);



  constructor(private formBuilder: FormBuilder) {
    this.equationsFrom = formBuilder.group({
      "inaccuracy": ["0.1", [Validators.required,
        Validators.max(0.1),
        Validators.min(0),
        Validators.pattern('-?\\d+([\\.,]\\d+)?')]],
      "firstBoundaryOfInterval": ["0", [Validators.required,
        Validators.pattern('-?\\d+([\\.,]\\d+)?')]],
      "secondBoundaryOfInterval": ["0", [Validators.required,
        Validators.pattern('-?\\d+([\\.,]\\d+)?')]], //'\\d+(\\.|,\\d+)?'
      "func": ["", [Validators.required]],
      "method": ["", [Validators.required]]
    });
  }

  onRadioChange(event: number) {
    this.choseEvent.emit(event)

  }

  submit() {
    this.choseEvent.emit(this.equationsFrom.value.func);
    this.appService.equationMake(this.equationsFrom.value.func, this.equationsFrom.value.method,
      this.equationsFrom.value.firstBoundaryOfInterval, this.equationsFrom.value.secondBoundaryOfInterval, this.equationsFrom.value.inaccuracy).subscribe({
      next: (response) => {
        alert("корень = "+ response.uknownX+ "   значение функции = "+ response.fun);
        this.appService.dataUser="корень = "+ response.uknownX+ "   значение функции = "+ response.fun;
        console.log(response);
      },
      error: (error) => {
        if (error.status === 400) {
          alert(error.error);
          this.appService.dataUser=error.error;
        } else {
          console.error(error);
          this.appService.dataUser=error;
        }      }
    });
  }


}
