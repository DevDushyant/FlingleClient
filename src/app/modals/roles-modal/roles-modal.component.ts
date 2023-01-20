import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent {
  @Input() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[];
  constructor(public bsModalRef: BsModalRef,private location:Location) {}
  updateRoles() {
    
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
   
    }
}
