import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

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
