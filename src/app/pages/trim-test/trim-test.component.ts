import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitebarWrapperComponent } from 'src/app/template/sitebar-wrapper/sitebar-wrapper.component';

@Component({
  selector: 'app-trim-test',
  standalone: true,
  imports: [CommonModule,SitebarWrapperComponent],
  templateUrl: './trim-test.component.html',
  styleUrls: ['./trim-test.component.scss']
})
export class TrimTestComponent implements OnInit {
  pixelStep: number = 0;
  rangeMin: number = 0;
  rangeMax: number = 0;
  rangeValue: number = 0;
  scaleWidth = 300;
  canvas: HTMLCanvasElement = {} as HTMLCanvasElement;
  ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  video: HTMLVideoElement = {} as HTMLVideoElement;
  rangeSlider: HTMLInputElement = {} as HTMLInputElement;

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.querySelector('canvas');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    this.video = <HTMLVideoElement>document.querySelector('video');
    this.rangeSlider = <HTMLInputElement>document.getElementById('myRange');

    this.video.addEventListener('play', () => {
      const step = () => {
        this.ctx.drawImage(
          this.video,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
        this.pixelStep =
          Math.round((this.video.currentTime / this.video.duration) * 100) *
          (this.scaleWidth / 100);
        this.rangeSlider.value = this.video.currentTime.toString();
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      this.rangeValue = this.video.currentTime;
    });
  }

  onMetadata(e: any, video: HTMLVideoElement) {
    this.rangeMax = video.duration;
  }

  rangeChange(event: any) {
    const currentTime = +event.value;
    const duration = this.rangeMax;
    this.pixelStep = (currentTime / duration) * this.scaleWidth;
    this.video.currentTime = currentTime;
    // this.video.play();
  }
}
