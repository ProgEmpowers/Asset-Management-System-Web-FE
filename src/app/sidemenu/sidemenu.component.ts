import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../Models/user.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { transform } from 'typescript';

interface SidemenuToggled {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
  animations: [
    trigger('fade', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateX(-20%)',
        })
      ),
      transition(':leave', animate('0.15s 0.1s ease-in')),
      transition(':enter', animate('0.2s 0.15s ease-in')),
    ]),
    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity:0
        })
      ),
      transition('void => *', animate('0.15s 0.2s ease')),
      transition('* => void', animate('0.15s 0.1s ease')),
    ])
  ],
})
export class SidemenuComponent implements OnInit {
  @ViewChild('logoBtn') logoBtn!:ElementRef
  @Output() onToggleSidemenu: EventEmitter<SidemenuToggled> =
    new EventEmitter();

  isCollapsed = false;
  user?: User;
  screenWidth = 0;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        console.log(response);
        this.user = response;
      },
    });
    this.user = this.authService.getUser();
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.onToggleSidemenu.emit({
      collapsed: this.isCollapsed,
      screenWidth: this.screenWidth,
    });
  }
}
