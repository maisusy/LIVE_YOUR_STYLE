import { AppService } from 'src/app/app.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-ventas',
  templateUrl: './modal-ventas.component.html',
  styleUrls: ['./modal-ventas.component.css'],
  providers : [ConfirmationService,MessageService]
})
export class ModalVentasComponent {


  @Input() visible: boolean = false;
  @Input() datos: any = null;

  @Output() success = new EventEmitter();

  public accion: string = "";
  public stock: number = 0;
  public invalid: string = "";
  public invalid_2: string = "";

  formProductosVenta= new FormGroup({
    'producto_id': new FormControl('', Validators.required),
    'descripcion': new FormControl('', Validators.required),
    'precio': new FormControl(1, Validators.required),
    'cantidad': new FormControl(1, Validators.required),
    'costo_total': new FormControl(1, Validators.required),
    'stock': new FormControl(1, Validators.required),
  })

  constructor(
    public AppService : AppService
  ) { }

  ngOnInit(): void {

  }

  CambiaCantidad(event : any){
    const precioControl = this.formProductosVenta.get('precio');
    const costoTotalControl = this.formProductosVenta.get('costo_total');
    if(event > this.stock){
        this.invalid_2 = 'ng.dirty';
    }else{
      if (precioControl?.value !== null && costoTotalControl?.value !== null && precioControl?.value !== undefined && costoTotalControl?.value !== undefined) {
        costoTotalControl.setValue((precioControl.value * event));
      }
    }
  }

  hide() {
    this.formProductosVenta.reset()
    this.invalid = ""
    this.success.emit()
  }

  show() {
      this.accion = this.datos.estado;
      this.stock = this.datos.stock;
      let data = this.datos;
      delete data.estado;
      this.formProductosVenta.setValue(this.datos);
  }

  submit() {
    const cantidad = this.formProductosVenta.value.cantidad ;
    if(cantidad !== null && cantidad !== undefined){
      if(cantidad > this.stock){
        this.invalid_2 = 'ng.dirty';
      }else{
          if (this.formProductosVenta.valid) {
            if (this.accion == "AGREGAR") {
              let data = this.formProductosVenta.value;
              this.AppService.productos.push(data);
              this.AppService.NotificarMenu(); // Notificar al componente del menú que los productos se han actualizado

            } else {
                console.log(this.accion);
                let data = this.formProductosVenta.value;

                this.AppService.productos.forEach((valor: any) => {
                  if (valor.producto_id == this.formProductosVenta.value.producto_id) {
                    valor.cantidad = data.cantidad;
                    valor.costo_total = data.costo_total;
                  }
                });
                console.log('datos ', this.AppService.productos);
                this.AppService.NotificarMenu();
            }
            this.hide();
          } else {
            this.invalid = "ng-dirty";
          }
        }
    }


  }


}
