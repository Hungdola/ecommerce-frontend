import { Component, Input, OnInit } from '@angular/core';
import { navigation } from './nav-content';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit {
  
  category: any
  @Input() selectedSection: any

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.category=navigation

    console.log("selected section", this.selectedSection)
  }

  handleNavigate = (path: any) => {
    this.router.navigate([path])
  }

}
