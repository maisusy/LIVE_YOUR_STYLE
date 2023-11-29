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
  public insumos: any = [];

  formsInsumo = new FormGroup({
    'insumo': new FormControl(''),
    'cantidad': new FormControl(0, Validators.required),
    'costo_total': new FormControl(0, Validators.required),
  })

  constructor(
    private messageService: MessageService,
    public InsumoService: InsumoService,
    public ProductoService : ProductoService
  ) { }

  ngOnInit(): void {
    this.ObtenerInsumo()
  }


  ObtenerInsumo(){
    this.InsumoService.ObtenerInsumo()
    .subscribe(
      (res) => {
        this.insumos = res
      }
    )
  }

  hide() {
    this.formsInsumo.reset()
    this.invalid = ""
    this.success.emit()
  }

  show() {

    if (this.datos != null) {
      this.accion = "Cambiar"
      this.formsInsumo.setValue(this.datos)
    } else {
      this.accion = "Agregar"
    }
  }


  submit() {
    let insumo = this.ProductoService.insumos;
    let cantidad = this.formsInsumo.value.cantidad;
    let data = this.insumos.filter( (valor:any) => valor.id == this.formsInsumo.value.insumo)

    let precio_unidad = data.map((valor:any) => valor.costo);

    if (this.formsInsumo.valid ) { 
      if(this.accion = "Cambiar"){

        console.log('precio_unidad',precio_unidad)
        console.log('cantidad',cantidad)
        if(precio_unidad !== null && cantidad !== null && precio_unidad !== undefined && cantidad !== undefined){
          this.formsInsumo.value.costo_total  = (precio_unidad * cantidad);
        }
        insumo.push(this.formsInsumo.value)
        console.log(insumo)
        this.ProductoService.insumos = insumo;
        this.messageService.add({ key: 'abm-unidad_medida', severity: 'success', summary: `Insumo Agregado`, detail: 'La acción se realizo correctamente' });
        
      }else{

        insumo.forEach((item:any) => {
          if(item.insumo == this.formsInsumo.value.insumo){
            item.cantidad = this.formsInsumo.value.cantidad;
            if(precio_unidad !== null && cantidad !== null && precio_unidad !== undefined && cantidad !== undefined){
              item.costo_total = (precio_unidad * cantidad);
            }
          }
          
        });

        this.ProductoService.insumos = insumo;

      }

    }else {
      this.invalid = "ng-dirty"
    }
  }

}
