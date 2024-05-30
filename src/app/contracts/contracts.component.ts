import { Component } from '@angular/core';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss'
})
export class ContractsComponent {

  submitConsole() {
    console.log("Submit button clicked");
  }
}
