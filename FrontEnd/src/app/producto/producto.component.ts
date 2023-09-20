import { Component } from '@angular/core';
import { ProductoService } from './producto.service'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  public productos : any; 
  public loading : boolean = true;   
  responsiveOptions: any[] | undefined;

  
  constructor(
    public ProductoService : ProductoService,
  ) { }

  ngOnInit(): void {
      this.ObtenerProductos()
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
        this.loading = false;
        console.log(res)
      }
      )
  }


}
