import {Component, EventEmitter, inject, Output} from "@angular/core";
import {AppService} from "../../app.service";


@Component({
  selector: 'app-filik',
  standalone: true,
  imports: [],
  templateUrl: './filik.component.html',
  styleUrl: './filik.component.css'
})
export class FilikComponent {
  file: File | null = null;
  @Output() choseEvent = new EventEmitter<number>();
  private appService = inject(AppService);

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }

  onUpload() {
    if (this.file) {
      let json;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
           json = JSON.parse(e.target.result);
          if (json.func) {
            this.onRadioChange(json.func);
            this.appService.equationMake(json.func, json.method, json.firstBoundaryOfInterval, json.secondBoundaryOfInterval, json.inaccuracy).subscribe({
              next: (response) => {
                alert("корень = " + response.uknownX + "   значение функции = " + response.fun);
                console.log(response);
              },
              error: (error) => {
                if (error.status === 400) {
                  alert(error.error.message);
                } else {
                  console.error(error);
                }
              }
            });

          } else {
            this.onRadioChange(parseInt(json.system) + 3);
            this.appService.systemMake(parseInt(json.system)+3,json.method, json.initialApproximationByX, json.initialApproximationByY,json.inaccuracy).subscribe({
                next: (response) => {
                  alert("x = " + response.x + "   y = " + response.y);
                  console.log(response);
                },
                error: (error) => {
                  if (error.status === 400) {
                    alert(error);
                  } else {
                    console.error(error);
                  }
                }
              }
            );
          }
        } catch (e) {
          alert("я не понимать файл like этот");
        }
      };
      reader.readAsText(this.file);

      console.log(3242334232234)
    }
  }


  onRadioChange(event: number) {
    this.choseEvent.emit(event)

  }
}
