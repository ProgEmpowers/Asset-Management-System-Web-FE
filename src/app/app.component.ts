import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth/services/auth.service';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { User } from './Models/user.model';

interface SidemenuToggled {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  @ViewChild('sidemenu') sidemenu!:SidemenuComponent;
  user?:User;

  title = 'Frontend';
  modelOpened = true;
  showSideNav: boolean = true;
  showHeader: boolean = true;
  isSideMenuCollapsed = false;
  screenWidth = 0;

  constructor(private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showSideNav = !event.urlAfterRedirects.includes('/login');
      this.showHeader = !event.urlAfterRedirects.includes('/login');
    });

    this.user = this.authService.getUser();
    if(!this.user?.email){
      this.showSideNav = false;
    } else
    this.showSideNav = true;
  }

  closeModel() {
    this.modelOpened = false
  }

  onToggleSideMenu(data: SidemenuToggled) {
    this.screenWidth = data.screenWidth;
    this.isSideMenuCollapsed = data.collapsed;
  }
}
