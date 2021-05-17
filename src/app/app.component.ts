import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHead: boolean = false;

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    console.log('refresh')
  }

  constructor (private zone: NgZone, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.showHead = (event.url === '/' || event.url === '/tv-series' || event.url === '/movies' || event.url === '/favorites');
      }
    });
  }

  ngOnInit(): void {
    //this.router.navigate(['']);

  }

}
