import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '../../_services';
import { User } from '../../_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  users!: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    //Liste aqui os usuários para preencher a tabela
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      },
    });
  }

  deleteUser(id: string) {
    this.userService.delete(id).subscribe({
      next: (data) => {
        alert('Success!');
        this.ngOnInit();
      },
      error: (e) => {
        alert('Error');
      },
    });
  }
}
