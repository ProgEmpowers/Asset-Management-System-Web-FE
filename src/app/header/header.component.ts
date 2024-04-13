import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public menuItems: MenuItemModel[] = [
    {
      iconCss: 'far fa-bell',

    },
    {
      iconCss: 'far fa-user',
        items: [
            { text: 'My profile' },
            { text: 'Customize' },
            { text: 'Sign out' }
        ]
    }
];
}
