import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InsumoService } from 'src/app/insumo/insumo.service';
import { ProductoService } from '../../producto.service';

@Component({
  selector: 'app-modal-insumo',
  templateUrl: './modal-insumo.component.html',
  styleUrls: ['./modal-insumo.component.css']
})
export class ModalInsumoComponent {

  @Input() visible: boolean = false;
  @Input() datos: any = null;

  @Output() success = new EventEmitter();

  public accion: string = "";
  public invalid: string = "";
  public invalid_2: string = "";
  public unidad: string = "";
  public stock: number = 0;
  public cantidad: number = 0;
  public insumos: any = [];

  formsInsumo = new FormGroup({
    'insumo': new FormControl('', Validators.required),
    'cantidad': new FormControl(0, Validators.required),
    'descripcion': new FormControl(0),
    'costo_total': new FormControl(0,),
  })

  constructor(
    private messageService: MessageService,
    public InsumoService: InsumoService,
    public ProductoService : ProductoService
  ) { }

  ngOnInit(): void {
    this.invalid_2 = "";
    this.ObtenerInsumo()
  }

  Cambiar(event : any){
    this.insumos.forEach((valor:any) => {
      if(event.value == valor.id ){
        this.unidad = valor.unidad;
        this.stock = valor.stock;
      }
    });
  }

  CambiarCantidad(event : any){
    this.cantidad = event
    if( this.cantidad > this.stock){
      this.invalid_2 = "ng-dirty"
    }
  }

  ObtenerInsumo(){
    this.InsumoService.ObtenerInsumo()
    .subscribe(
      (res) => {
        let data : any  = res;
        console.log(res)
        data.forEach( (valor:any) => {
          this.insumos.push({'id':valor.id,
                            'descripcion':valor.descripcion + ' - ' + valor.color.nombre,
                            'unidad':valor.unidad_medida.nombre,
                            'stock':valor.stock,
                            'costo':valor.costo,
                            'nombre':valor.descripcion})
        })
      }
    )
  }

  hide() {
    this.formsInsumo.reset()
    this.invalid = ""
    this.invalid_2 = ""
    this.success.emit()
  }

  show() {
    if (this.datos !== null) {
      this.accion = "Cambiar"
      this.formsInsumo.setValue(this.datos)
    } else {
      this.accion = "Agregar"
    }
  }


  submit() {
    if(this.cantidad > this.stock){
      this.invalid_2 = "ng-dirty"

    }else{
      let cantidad = this.formsInsumo.value.cantidad;
      let data = this.insumos.filter( (valor:any) => valor.id == this.formsInsumo.value.insumo)

      console.log(data)
      let precio_unidad = data.map((valor:any) => valor.costo);
      this.formsInsumo.value.descripcion = data.map((valor:any) => valor.nombre);

      if (this.formsInsumo.valid ) {
        if(this.accion == "Agregar"){

          if(precio_unidad !== null && cantidad !== null && precio_unidad !== undefined && cantidad !== undefined){
            this.formsInsumo.value.costo_total  = (precio_unidad * cantidad);

          }
          console.log(this.formsInsumo.value)
          this.ProductoService.insumos.push(this.formsInsumo.value);

          this.messageService.add({ key: 'modalinsumo', severity: 'success', summary: `Insumo Agregado`, detail: 'La acción se realizo correctamente' });
          this.invalid_2 = "";
        }else{
          this.ProductoService.insumos.forEach((item:any) => {
            if(item.insumo == this.formsInsumo.value.insumo){
              item.cantidad = this.formsInsumo.value.cantidad;
              if(precio_unidad !== null && cantidad !== null && precio_unidad !== undefined && cantidad !== undefined){
                item.costo_total = (precio_unidad * cantidad);
              }
            }

          })
          this.invalid_2 = "";
        }

        this.hide()

      }else {
        this.invalid = "ng-dirty"
      }
    }

  }

}
