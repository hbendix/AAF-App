import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * @param message Message to display on the notification
   * @param success show error or success message
   * @param duration how long to stay on the screen
   */
  public triggerNotification (message: string, success: boolean, duration: number) {
    let panelClass: string;

    if (success) {
      panelClass = 'snackbar-success';
    } else {
      panelClass = 'snackbar-error';
    }

    this.snackBar.open(message, null, {
      duration: duration,
      panelClass: [panelClass]
    });
  }
}
