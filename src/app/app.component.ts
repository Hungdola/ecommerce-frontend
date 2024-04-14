import { getUserProfile } from './State/User/user.action';
import { UserService } from 'src/app/State/User/user.service';
import { Component, OnInit } from '@angular/core';
import { AppState } from './Models/AppState';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-angular';

  constructor(private userService: UserService, private store: Store<AppState>) {

  }


  ngOnInit(): void {
    if(localStorage.getItem("jwt"))
    this.userService.getUserProfile()

    this.store.pipe(select((store) => store.auth)).subscribe((user) => {
      this.userService.getUserProfile()
      console.log("store", this.store)
    })


  }

  
}
