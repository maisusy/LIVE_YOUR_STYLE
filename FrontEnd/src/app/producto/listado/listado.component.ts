import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class ListadoComponent implements OnInit {

  public Productos : any;
  public productoimagen : any;
  public loading: boolean = true; 

  constructor(
    public confirmationService : ConfirmationService,
    public messageService : MessageService,
    public ProductoService : ProductoService,
    private config: PrimeNGConfig,
    public router : Router,
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
    this.ObtenerImgProductos()
    this.ObtenerProducto()
  
  }

  Nuevo(){
      this.router.navigate(['abm-producto'])
  }

  Modificar(datos : any = null){
    delete datos.img;
    this.ProductoService.datoCompartido = datos;
    this.router.navigate(['producto/abm-producto']);
  }

  success(){
    this.ObtenerProducto()
    this.ObtenerImgProductos()
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

    this.ProductoService.BorrarProducto(id)
    .subscribe( _ => {
      this.messageService.add({key: 'Producto', severity:'success', summary: `ELIMINACIÓN Producto` , detail:'La acción se realizo correctamente'});
      this.success()
    }, error => {
      console.log(error)
      this.messageService.add({key: 'Producto', severity:'error', summary: `ELIMINACIÓN Producto` , detail: error.error.error});
    })
    
  }

  ObtenerProducto(){
    this.ProductoService.ObtenerProductos()
    .subscribe(
      (res) => {
        this.Productos = res;


          this.Productos.forEach((valor : any) => {

             this.productoimagen.forEach((valorimg : any) => {
              if(valorimg.producto == valor.id){
                  valor.img = valorimg.imagen;  
              }
            }) 
        }); 

        this.loading = false;
        console.log('productos ',this.Productos)
      }
    )
  }

  ObtenerImgProductos(){
    this.ProductoService.ObteneImgProductos()
    .subscribe(
      (res) => {
        this.productoimagen = res;
        console.log('productoimagen ',this.productoimagen)
      }
      )
  }

}
