import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  //hasUser = localStorage.getItem('currentUser');
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    console.log('refresh')
  }

  constructor(


  ) { }
  ngOnDestroy(): void {
    console.log('destroy')
  }

  ngOnInit(): void {
    console.log("init")
    //this.router.navigate(['']);

  }

}
