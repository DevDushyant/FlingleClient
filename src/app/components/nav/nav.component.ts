import { Component,OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit{

  model: any = {};

  constructor(public accountService: AccountService,private router: Router, private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    console.log(this.accountService.currentUser$);
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');

    }, error => {
      this.toastr.error(error.error);

    })
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')

  }
}
