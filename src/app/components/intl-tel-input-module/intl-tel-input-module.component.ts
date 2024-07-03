import { Component, OnInit } from '@angular/core';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-intl-tel-input-module',
  templateUrl: './intl-tel-input-module.component.html',
  styleUrl: './intl-tel-input-module.component.scss'
})
export class IntlTelInputModuleComponent implements OnInit {
  ngOnInit(): void {
    const inputElement = document.querySelector('#phone') as HTMLInputElement;
    if (inputElement) {
      intlTelInput(inputElement, {
        initialCountry: 'auto',
        geoIpLookup: callBack => {
          fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(data => callBack(data.country_code))
          .catch(() => callBack("lk"));
        },
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      })
    }
  }

}
