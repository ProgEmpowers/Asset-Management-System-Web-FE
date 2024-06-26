import { Component,OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Frontend';
  modelOpened = true;
  showSideNav: boolean = true;
  showHeader: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // this.showSideNav = !event.urlAfterRedirects.includes('/login');
      // this.showHeader = !event.urlAfterRedirects.includes('/login');
      const url = event.urlAfterRedirects;
      this.showSideNav = !this.shouldHideSidebar(url);
      this.showHeader = !this.shouldHideHeader(url);
    });
  }
  shouldHideSidebar(url: string): boolean {
    return (url.includes('/login') || url.includes('/forget-password') || url.includes('/reset-password'));
  }

  shouldHideHeader(url: string): boolean {
    return (url.includes('/login') || url.includes('/forget-password') || url.includes('/reset-password'));
  }

  closeModel() {
    this.modelOpened = false
  }
}
