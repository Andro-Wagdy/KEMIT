import { Injectable } from '@angular/core';
import {
  Router
  } from '@angular/router';
 import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { BaseListResolver } from 'src/app/_metronic/resolvers/base-List.resolver';
 @Injectable({
  providedIn: 'root'
})
export class UserListResolver extends BaseListResolver<User> {
  constructor(
    router: Router,
    baseService:UserService,
    alertService: AlertService
  ) {
    super(router, baseService, alertService);
  }
}


