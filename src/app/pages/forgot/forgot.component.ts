import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { forgotService } from '../../services/forgot.service';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  email = '';
  otp = '';
  newPassword = '';
  confirmPassword = '';
  message = '';
  step: number = 1; // 1 = Email, 2 = OTP, 3 = Change Password

  constructor(private forgotService: forgotService) {}

  // Step 1: Send OTP
  sendOtp() {
    this.forgotService.sendOtp(this.email).subscribe({
      next: () => {
        this.message = 'OTP sent successfully to your email.';
        this.step = 2;
      },
      error: (err) => {
        this.message = err.error || 'Failed to send OTP. Try again.';
      }
    });
  }

  // Step 2: Verify OTP
  verifyOtp() {
    this.forgotService.verifyOtp(this.email, this.otp).subscribe({
      next: () => {
        this.message = 'OTP verified successfully.';
        this.step = 3;
      },
      error: (err) => {
        this.message = err.error || 'Invalid or expired OTP.';
      }
    });
  }

  // Step 3: Change Password
  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      return;
    }

    this.forgotService.resetPassword(this.email, this.newPassword).subscribe({
      next: () => {
        this.message = 'Password changed successfully!';
        this.step = 1;
        this.email = this.otp = this.newPassword = this.confirmPassword = '';
      },
      error: (err) => {
        this.message = err.error || 'Failed to change password.';
      }
    });
  }
}
