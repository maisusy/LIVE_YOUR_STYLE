import { Component } from '@angular/core';
import { ConfirmationService , MessageService, PrimeNGConfig } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css'],
  providers : [ConfirmationService,MessageService]
})
export class CambiarContraseniaComponent {

  public invalid: string = "";
  public username: string = "";

  formsUsuario = new FormGroup({
    'password': new FormControl('', Validators.required),
    'rep_contraseña': new FormControl('', Validators.required),
  })

  constructor(
    public config : PrimeNGConfig,
    public router : Router,
    public UsuarioService : UsuarioService,
    public messageService : MessageService,
  ){}

  ngOnInit(): void {
    this.username =  localStorage.getItem('username')?.toString() || ''
    console.log(this.username)
    this.config.setTranslation({
      'weak' : 'Débil',
      'medium' : 'Moderada',
      'strong' : 'Alta',
    })

   
  }

  Cancelar(){
    this.router.navigate(['inicio'])
  }


  submit() {
    if (this.formsUsuario.valid) {
      delete this.formsUsuario.value.rep_contraseña
      console.log(this.formsUsuario.value)
      console.log(this.username)
      this.UsuarioService.CambiarContraseña(this.username,this.formsUsuario.value)
      .subscribe(_ => {
        this.messageService.add({ key: 'abm-usuario', severity: 'success', summary: `Cambio de Contraseña`, detail: 'La acción se realizo correctamente' });
        
      }, error => {
        console.log(error)
        this.messageService.add({ key: 'abm-usuario', severity: 'error', summary: `Cambio de Contraseña`, detail: error.error.error });
      })
    }
  }



}
