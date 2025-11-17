import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-fields',
  imports: [RouterLink , RouterOutlet, RouterLinkActive],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.css',
  standalone:true
})
export class FieldsComponent {

}
