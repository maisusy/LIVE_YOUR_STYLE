import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PredefinidosService } from '../predefinidos.service'
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class ColorComponent {

  public Color : any;
  public modalDatos : any;
  public modal : string = "";
  public loading: boolean = true; 

  constructor(
    public confirmationService : ConfirmationService,
    public messageService : MessageService,
    public ColorService : PredefinidosService,
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
    this.ObtenerColor()
  
  }

  success(){
    
    this.modal = '';
    this.ObtenerColor()
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

    this.ColorService.BorrarColor(id)
    .subscribe( _ => {
      this.messageService.add({key: 'color', severity:'success', summary: `ELIMINACIÓN COLOR` , detail:'La acción se realizo correctamente'});
      this.success()
    }, error => {
      console.log(error)
      this.messageService.add({key: 'color', severity:'error', summary: `ELIMINACIÓN COLOR` , detail: error.error.error});
    })
    
  }

  ObtenerColor(){
    this.ColorService.ObtenerColor()
    .subscribe(
      (res) => {
        this.Color = res;
        this.loading = false;
      }
      )
  }


}
