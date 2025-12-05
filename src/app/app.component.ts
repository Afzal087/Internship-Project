import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';    
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SimpleDialogComponent } from './dialog-box/dialog-box.component';




@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet,MatIconModule,FormsModule,SimpleDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
}
