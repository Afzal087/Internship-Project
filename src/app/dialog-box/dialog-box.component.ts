import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog-service.service';

@Component({
  selector: 'app-simple-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="dialog.message$ | async as message">
  <div class="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]"
       (click)="dialog.hide()">
    <div (click)="$event.stopPropagation()"
         class="bg-white rounded-xl shadow-2xl w-[90%] max-w-md overflow-hidden border border-blue-900">
      
      <!-- Header with gradient -->
      <div class="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <svg class="w-5 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-white">Notification</h3>
        </div>
      </div>

      <!-- Message Body -->
      <div class="px-6 py-6 bg-gray-50">
        <p class="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
          {{ message }}
        </p>
      </div>

      <!-- Footer with button -->
      <div class="px-6 py-3 bg-white border-t border-gray-200 flex justify-end">
        <button (click)="dialog.hide()"
                class="px-6 py-2 bg-blue-800 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md">
          OK
        </button>
      </div>
    </div>
  </div>
</ng-container>
  `
})
export class SimpleDialogComponent {
  constructor(public dialog: DialogService) {}
}
