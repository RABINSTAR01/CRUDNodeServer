// import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserModule } from '@angular/platform-browser';
// import { Routes, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { ItemListComponent } from './item-list/item-list.component';
// const routes: Routes = [
//   { path: '', redirectTo: '/items', pathMatch: 'full' },
//   { path: 'items', component: ItemListComponent },
// ];
// @NgModule({
//   declarations: [
//     AppComponent,
//     ItemListComponent,
//   ],
//   imports: [RouterModule.forRoot(routes),
//     BrowserModule,
//     HttpClientModule,
//     AppRoutingModule,
//     FormsModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'items', component: ItemListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
