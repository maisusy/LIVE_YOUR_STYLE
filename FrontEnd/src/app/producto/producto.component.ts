import { Component } from '@angular/core';
import { ProductoService } from './producto.service'
import { Router } from '@angular/router';
import { ConfirmationService , MessageService } from 'primeng/api';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers : [ConfirmationService,MessageService]
})
export class ProductoComponent {

  public productos : any; 
  public loading : boolean = true;   
  responsiveOptions: any[] | undefined;
  public env = environment;
  public productoimagen : any;

  constructor(
    public ProductoService : ProductoService,
    public router : Router,
    public confirmationService : ConfirmationService,
    public messageService : MessageService,
  ) { }

  ngOnInit(): void {
      this.ObtenerImgProductos() 
      this.ObtenerProductos()
      this.loading = false

      this.responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '1220px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '1100px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }


  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return 'danger';
      }
  }



  ObtenerProductos(){
    this.ProductoService.ObtenerProductos()
    .subscribe(
      (res) => {
        this.productos = res;


          this.productos.forEach((valor : any) => {

             this.productoimagen.forEach((valorimg : any) => {
              if(valorimg.producto == valor.id){
                  valor.img = valorimg.imagen;  
              }
            }) 
        }); 


        console.log('productos ',this.productos)
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
      this.messageService.add({key: 'abm-producto', severity:'success', summary: `ELIMINACIÓN PRODUCTO` , detail:'La acción se realizo correctamente'});
    }, error => {
      console.log(error)
      this.messageService.add({key: 'abm-producto', severity:'error', summary: `ELIMINACIÓN PRODUCTO` , detail: error.error.error});
    })
  }

}
