import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InsumoService } from '../insumo/insumo.service'

@Component({
  selector: 'app-insumo',
  templateUrl: './insumo.component.html',
  styleUrls: ['./insumo.component.css'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class InsumoComponent {

  public Insumo : any;
  public modalDatos : any;
  public modal : string = "";
  public loading: boolean = true; 
  public filtroColor : string = '';

  constructor(
    public confirmationService : ConfirmationService,
    public messageService : MessageService,
    public InsumoService : InsumoService,
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
    this.ObtenerInsumo()
  
  }

  aplicarFiltroColor() {
    if (this.filtroColor !== '') {
      this.Insumo = this.Insumo.filter((producto: any) =>
        producto.color.some((color: any) => color.nombre.toLowerCase().includes(this.filtroColor.toLowerCase()))
      );
    } else {
      // Si el filtro está vacío, restaura la lista completa
      this.ObtenerInsumo();
    }
  }

  success(){
    this.modal = '';
    this.ObtenerInsumo()
  }

  MODAL(tipo : string , modal : any = null ){
    this.modal = tipo;
    this.modalDatos = modal;
    console.log(this.modal)
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

    this.InsumoService.BorrarInsumo(id)
    .subscribe( _ => {
      this.messageService.add({key: 'insumo', severity:'success', summary: `ELIMINACIÓN INSUMO` , detail:'La acción se realizo correctamente'});
      this.success()
    }, error => {
      console.log(error)
      this.messageService.add({key: 'insumo', severity:'error', summary: `ELIMINACIÓN INSUMO` , detail: error.error.error});
    })
    
  }

  ObtenerInsumo(){
    this.InsumoService.ObtenerInsumo()
    .subscribe(
      (res) => {
        this.Insumo = res;
        this.loading = false;
        console.log(this.Insumo)
      }
      )
  }


}
