import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AlertService } from '../../_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    //Verifica se é Edição ou Criação de um novo usuário, caso venha o ID como parâmetro
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      address: ['', Validators.required],
    });

    //Se não for inclusão de um novo usuário, recupera os dados do mesmo
    // a partir do ID recuperado
    if (!this.isAddMode) {
      //Execute o método para recuperar o usuário e atualize o Form com os dados retornados
      this.userService.getById(this.id).subscribe({
        next: (data) => {
          this.form.patchValue(data);
        },
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    //if (this.form.invalid) {
     // return;
   // }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    //Recupere os parametros do formulário e execute o método
    //para cadastrar o usuário
    this.userService.create(this.form.value).subscribe({
      next: (data) => {
        alert('Success');
        this.router.navigateByUrl('list');
      },
    });

    //Navegue até a lista atualizando-a com o usuário criado
  }

  private updateUser() {
    //Recupere o Id do usuário e os parametros do formulário
    //e execute o método para salvar o usuário
    this.userService.update(this.id, this.form.value).subscribe({
      next: (data) => {
        alert('Success');
        this.router.navigateByUrl('list');
      },
    });

    //Navegue até a lista atualizando-a com o usuário alterado
  }
}
