import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ProveedorService } from './proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class ProveedorComponent {

  public Proveedor : any;
  public modalDatos : any;
  public modal : string = "";
  public loading: boolean = true; 

  constructor(
    public confirmationService : ConfirmationService,
    public messageService : MessageService,
    public ProveedorService : ProveedorService,
    private config: PrimeNGConfig,
  ) { }

  ngOnInit(): void {
    this.config.setTranslation({
      'startsWith' : 'Que comienze con',
      'contains' : 'Que Contenga',
      'notContains' : 'Que NO contenga',
      'endsWith' : 'Que finalize con',
      'equals' : 'Que sea igual a',
      'notEquals' : 'Que NO sea igual a',
      'noFilter' : 'Sin filtros'

    })
    this.ObtenerProveedor()
  
  }

  success(){
    
    this.modal = '';
    this.ObtenerProveedor()
  }

  MODAL(tipo : string , modal : any = null ){
    this.modal = tipo;
    this.modalDatos = modal;
  }

  Confirmar(event : Event, id : number ){
      this.confirmationService.confirm({
        target: event.target!,
          message: '¿Estas seguro?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.Eliminar(id)
          },
          reject: () => {
              //reject action
        }
    });
  }

  Eliminar(id : number){

    this.ProveedorService.BorrarProveedor(id)
    .subscribe( (_ : any) => {
      this.messageService.add({key: 'Proveedor', severity:'success', summary: `ELIMINACIÓN Proveedor` , detail:'La acción se realizo correctamente'});
      this.success()
    }, (error : any) => {
      console.log(error)
      this.messageService.add({key: 'Proveedor', severity:'error', summary: `ELIMINACIÓN Proveedor` , detail: error.error.error});
    })
    
  }

  ObtenerProveedor(){
    this.ProveedorService.ObtenerProveedor()
    .subscribe(
      (res : any) => {
        this.Proveedor = res;
        this.loading = false;
        }
      )
  }


}
