import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
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

@Component({
  selector: 'app-mathlist',
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
  templateUrl: './mathlist.component.html',
  styleUrl: './mathlist.component.css'
})
export class MathlistComponent {
  equationsFrom: FormGroup;
  @Output() choseEvent = new EventEmitter<number>();
  private appService = inject(AppService);


  constructor(private formBuilder: FormBuilder) {
    this.equationsFrom = formBuilder.group({
      "a": ["0", [Validators.required,
        Validators.pattern('-?\\d+([\\.,]\\d+)?')]],
      "b": ["0", [Validators.required,
        Validators.pattern('-?\\d+([\\.,]\\d+)?')]], //'\\d+(\\.|,\\d+)?'
      "func": ["", [Validators.required]],
      "method": ["", [Validators.required]]
    });
  }

  onRadioChange(event: any) {
    if (event.value === '1') {
      this.choseEvent.emit(1)
      // Выполните вашу функцию здесь
      console.log('Кнопка 1 выбрана');
    } else if (event.value === '2') {
      this.choseEvent.emit(2)

      console.log("2")
    }

  }

  submit() {
    this.appService.equationMake(this.equationsFrom.value.func, this.equationsFrom.value.method,
      this.equationsFrom.value.a, this.equationsFrom.value.b).subscribe(response => {
      console.log(response);
    }, error => {
      console.error(error);
    });
    console.log("to do request");
  }


}
