import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
// import { MainCarouselComponent } from './home/main-carousel/main-carousel.component';
// import { HomeProductCardComponent } from './home/home-product-card/home-product-card.component';
// import { ProductSliderComponent } from './home/product-slider/product-slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NavbarComponent } from './navbar/navbar.component';
// import { NavContentComponent } from './navbar/nav-content/nav-content.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { SharedModule } from "./Module/shared/shared.module";
import { FeatureModule } from "./Module/feature/feature.module";
import { AdminModule } from './Module/admin/admin.module';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './Module/auth/auth.module';
import { authReducer } from './State/Auth/auth.reducer';
import { userReducer } from './State/User/user.reducer';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { productReducer } from './State/Product/product.reducer';
import { cartReducer } from './State/Cart/cart.reducer';
import { orderReducer } from './State/Order/order.reducer';
// import { FooterComponent } from './footer/footer.component';



@NgModule({
    declarations: [
        AppComponent,
        // HomeComponent,
        // MainCarouselComponent,
        // HomeProductCardComponent,
        // ProductSliderComponent,
        // NavbarComponent,
        // NavContentComponent,
        // FooterComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        // MatIconModule,
        // MatButtonModule,
        // MatMenuModule,
        SharedModule,
        FeatureModule,
        AdminModule,
        AuthModule,
        StoreModule.forRoot({auth: authReducer, user: userReducer, product: productReducer, cart: cartReducer, order: orderReducer}),
        HttpClientModule
    ]
})
export class AppModule { }
