import {Component} from '@angular/core';
import {Subject} from "rxjs";
import {WebcamImage, WebcamInitError, WebcamModule, WebcamUtil} from "ngx-webcam";


@Component({
  selector: 'app-cam',
  standalone: true,
  imports: [
    WebcamModule
  ],
  templateUrl: './cam.component.html',
  styleUrl: './cam.component.css'
})
export class CamComponent {
  public videoOptions: MediaTrackConstraints = {
    // Здесь можно указать параметры видео, если необходимо
  };

  public trigger: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        // Обработка доступных видеоустройств
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    // Обработка полученного изображения
  }
}
