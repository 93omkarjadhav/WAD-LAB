import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Registration Form';
  
  displayname='';
  displayAddress='';
  displaycontact='';
  displayemail='';

  getValue(name:string, Address:string, contact:string, email:string){
    this.displayname=name;
    this.displayAddress=Address;
    this.displaycontact=contact;
    this.displayemail=email;

  }
}
