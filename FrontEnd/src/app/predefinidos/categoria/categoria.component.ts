import { Component } from '@angular/core';import { ConfirmationService, MessageService } from 'primeng/api';
import { PredefinidosService } from '../predefinidos.service'
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class CategoriaComponent {


  public Categoria : any;
  public modalDatos : any;
  public modal : string = "";
  public loading: boolean = true; 

  constructor(
    public confirmationService : ConfirmationService,
    public messageService : MessageService,
    public CategoriaService : PredefinidosService,
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
    this.ObtenerCategoria()
  
  }

  success(){
    
    this.modal = '';
    this.ObtenerCategoria()
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

    this.CategoriaService.BorrarCategoria(id)
    .subscribe( _ => {
      this.messageService.add({key: 'categoria', severity:'success', summary: `ELIMINACIÓN Categoria` , detail:'La acción se realizo correctamente'});
      this.success()
    }, error => {
      console.log(error)
      this.messageService.add({key: 'categoria', severity:'error', summary: `ELIMINACIÓN Categoria` , detail: error.error.error});
    })
    
  }

  ObtenerCategoria(){
    this.CategoriaService.ObtenerCategorias()
    .subscribe(
      (res) => {
        this.Categoria = res;
        this.loading = false;
      }
      )
  }


}
