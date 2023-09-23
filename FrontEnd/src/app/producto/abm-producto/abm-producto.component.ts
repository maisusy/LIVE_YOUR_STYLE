import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService , MessageService } from 'primeng/api';

@Component({
  selector: 'app-abm-producto',
  templateUrl: './abm-producto.component.html',
  styleUrls: ['./abm-producto.component.css'],
  providers : [ConfirmationService,MessageService]
})
export class AbmProductoComponent {

  public invalid: string = "";
  public accion : string = '';
  public categoria_producto : any;
  public unidad_medida : any;
  public marca : any;
  public color : any;
  public original : any[] = [
    {label:'Si',value:true},
    {label:'No',value:false}
  ]

  formsProducto = new FormGroup({
    'id': new FormControl(''),
    'nombre': new FormControl('', Validators.required),
    'stock': new FormControl('', Validators.required),
    'categoria_producto': new FormControl('', Validators.required),
    'precio': new FormControl('', Validators.required),
    'costo': new FormControl('', Validators.required),
    'unidad_medida': new FormControl('', Validators.required),
    'original': new FormControl('', Validators.required),
    'marca': new FormControl('', Validators.required),
    'color': new FormControl('', Validators.required),
    'obs': new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.ObtenerPredefinidos()
    if(this.formsProducto.value.id == null){
      this.accion = 'GUARDADO'
    }else{
      this.accion = 'ACTUALIZADO'
    }
  }

  constructor(
    public ProductoService : ProductoService,
    public messageService : MessageService,
    public confirmationService : ConfirmationService,
  ){}


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

  submit() {
      if (this.formsProducto.valid) {
        if (this.formsProducto.value.id== null) {

          console.log(this.formsProducto.value)

          this.ProductoService.AgregarProducto(this.formsProducto.value)
          .subscribe(_ => {
            this.messageService.add({ key: 'abm-producto', severity: 'success', summary: `${this.accion} PRODUCTO`, detail: 'La acción se realizo correctamente' });
          }, error => {
            console.log(error)
            this.messageService.add({ key: 'abm-producto', severity: 'error', summary: `${this.accion} PRODUCTO`, detail: error.error.error });
          })
        } else {
          let id = Number(this.formsProducto.value.id)

          this.ProductoService.ModificarProducto(id,this.formsProducto.value)
          .subscribe(_ => {
            this.messageService.add({ key: 'abm-producto', severity: 'success', summary: `${this.accion} PRODUCTO`, detail: 'La acción se realizo correctamente' });
          }, error => {
            console.log(error)
            this.messageService.add({ key: 'abm-producto', severity: 'error', summary: `${this.accion} PRODUCTO`, detail: error.error.error });
          })
        }
      } else {
        this.invalid = "ng-dirty"
      }
    }

    ObtenerPredefinidos(){
      this.ProductoService.ObtenerPredefinidos()
      .subscribe(
        (res) => {
          this.categoria_producto = res.categoria;
          this.marca = res.marca;
          this.unidad_medida = res.unidad_medida;
          this.color = res.color;
          console.log('predefinidos', res)
        }
        )
    }

}
