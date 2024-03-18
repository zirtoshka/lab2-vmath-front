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
          json = JSON.parse("{" + e.target.result + "}");
          if (json.func) {
            this.onRadioChange(json.func);
            this.appService.equationMake(json.func, json.method, json.firstBoundaryOfInterval, json.secondBoundaryOfInterval, json.inaccuracy).subscribe({
              next: (response) => {
                this.appService.dataUser = "корень = " + response.uknownX + "  значение функции = " + response.fun + " количество итераций: " + response.numberOfIterations;
                alert(this.appService.dataUser);
                console.log(response);
              },
              error: (error) => {
                if (error.status === 400) {
                  alert(error.error);
                  this.appService.dataUser = error.error;
                } else {
                  console.error(error);
                  this.appService.dataUser = error;
                }
              }
            });

          } else {
            this.onRadioChange(parseInt(json.system) + 3);
            this.appService.systemMake(parseInt(json.system) + 3, json.method, json.initialApproximationByX, json.initialApproximationByY, json.inaccuracy).subscribe({
                next: (response) => {
                  this.appService.dataUser = "x = " + response.x + "\ny = " + response.y +
                    "\nколичество итераций: " + response.numberOfIterations +
                    "\nвектор погрешностей x: " + response.errorVectorX +
                    "\nвектор погрешностей y: " + response.errorVectorY ;
                  alert(this.appService.dataUser);
                },
                error: (error) => {
                  if (error.status === 400) {
                    this.appService.dataUser = error.error;
                    alert(error.error);
                  } else {
                    console.error(error);
                    this.appService.dataUser = error;
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
    }
  }


  onRadioChange(event: number) {
    this.choseEvent.emit(event)

  }


  downloadFile() {
    const blob = new Blob([this.appService.dataUser], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'res.txt'; // Имя файла
    link.click();
    URL.revokeObjectURL(url);
  }
}
