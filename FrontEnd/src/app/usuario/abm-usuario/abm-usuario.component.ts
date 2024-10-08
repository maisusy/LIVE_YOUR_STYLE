import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService , MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.css'],
  providers : [ConfirmationService,MessageService]
})
export class AbmUsuarioComponent {

  public invalid_pass: string = "";
  public invalid: string = "";
  public accion : string = '';

  formsUsuario = new FormGroup({
    'id': new FormControl(''),
    'usuario': new FormControl('', Validators.required),
    'contraseña': new FormControl('', Validators.required),
    'rep_contraseña': new FormControl('', Validators.required),
    'nombres': new FormControl('', Validators.required),
    'apellidos': new FormControl('', Validators.required),
    'fecha_alta': new FormControl(this.obtenerFechaActual()),
    'dni': new FormControl('', Validators.required),
    'dir': new FormControl([], ),
    'email': new FormControl('',[ Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') ]),
    'nivel' : new FormControl(2, Validators.required),
    'telefono' : new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    console.log(this.formsUsuario.value.id)
    if(this.formsUsuario.value.id == null || this.formsUsuario.value.id == undefined || this.formsUsuario.value.id == ''){
      this.accion = 'CREACIÓN'
    }else{
      this.accion = 'MODIFICACIÓN'
    }

    this.config.setTranslation({
      'weak' : 'Débil',
      'medium' : 'Moderada',
      'strong' : 'Alta',
    })

  }

  constructor(
    public UsuarioService : UsuarioService,
    public confirmationService : ConfirmationService,
    public router : Router,
    public messageService : MessageService,
    private config: PrimeNGConfig,
  ){}

  Cancelar(){
    this.router.navigate(['login'])
  }

    obtenerFechaActual(): string {
      const fechaActual: Date = new Date();
      const year: number = fechaActual.getFullYear();
      const month: number = fechaActual.getMonth() + 1;
      const day: number = fechaActual.getDate();

      const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
      const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

      return `${year}-${formattedMonth}-${formattedDay}`;
    }

  submit() {
    if(this.formsUsuario.value.contraseña == this.formsUsuario.value.rep_contraseña ){

      if (this.formsUsuario.valid) {
        if (this.accion == 'CREACIÓN') {
            delete this.formsUsuario.value.id
            this.UsuarioService.AgregarUsuario(this.formsUsuario.value)
            .subscribe(_ => {
              this.messageService.add({ key: 'abm-usuario', severity: 'success', summary: `${this.accion} Usuario`, detail: 'La acción se realizo correctamente' });
              timer(1000).subscribe(() => {
                this.Cancelar();
              });
            }, error => {
              console.log(error)
              this.messageService.add({ key: 'abm-usuario', severity: 'error', summary: `${this.accion} Usuario`, detail: error.error.error });
            })
          } else {
            let id = Number(this.formsUsuario.value.id)

            this.UsuarioService.ModificarUsuario(id,this.formsUsuario.value)
            .subscribe(_ => {
              this.messageService.add({ key: 'abm-usuario', severity: 'success', summary: `${this.accion} Usuario`, detail: 'La acción se realizo correctamente' });
            }, error => {
              console.log(error)
              this.messageService.add({ key: 'abm-usuario', severity: 'error', summary: `${this.accion} Usuario`, detail: error.error.error });
            })
          }
        } else {
          this.invalid = "ng-dirty"
        }
    }else{
      this.invalid_pass  = "ng-dirty"
    }

  }

}
