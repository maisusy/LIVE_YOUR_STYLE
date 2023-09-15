import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PredefinidosService } from '../predefinidos.service'
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.css'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class UnidadMedidaComponent {


  public UnidadMedida : any;
  public modalDatos : any;
  public modal : string = "";
  public loading: boolean = true; 

  constructor(
    public confirmationService : ConfirmationService,
    public messageService : MessageService,
    public UnidadMedidaService : PredefinidosService,
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
    this.ObtenerUnidadMedida()
  
  }

  success(){
    
    this.modal = '';
    this.ObtenerUnidadMedida()
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

    this.UnidadMedidaService.BorrarUnidadMedida(id)
    .subscribe( _ => {
      this.messageService.add({key: 'abm', severity:'success', summary: `ELIMINACIÓN UNIDAD DE MEDIDA` , detail:'La acción se realizo correctamente'});
      this.success()
    }, error => {
      console.log(error)
      this.messageService.add({key: 'abm', severity:'error', summary: `ELIMINACIÓN UNIDAD DE MEDIDA` , detail: error.error.error});
    })
    
  }

  ObtenerUnidadMedida(){
    this.UnidadMedidaService.ObtenerUnidadMedida()
    .subscribe(
      (res) => {
        this.UnidadMedida = res;
        this.loading = false;
        console.log(res)
      }
      )
  }


}
