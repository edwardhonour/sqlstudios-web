import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitebarWrapperComponent } from '../sitebar-wrapper/sitebar-wrapper.component';

@Component({
  selector: 'app-blank-frame',
  standalone: true,
  imports: [CommonModule, SitebarWrapperComponent],
  templateUrl: './blank-frame.component.html',
  styleUrls: ['./blank-frame.component.css']
})
export class BlankFrameComponent {

}
