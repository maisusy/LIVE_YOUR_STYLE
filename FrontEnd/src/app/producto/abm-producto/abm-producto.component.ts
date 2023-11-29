import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService , MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { timer } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { InsumoService } from 'src/app/insumo/insumo.service';


@Component({
  selector: 'app-abm-producto',
  templateUrl: './abm-producto.component.html',
  styleUrls: ['./abm-producto.component.css'],
  providers : [ConfirmationService,MessageService]
})
export class AbmProductoComponent {
  public env = environment;
  public invalid: string = "";
  public accion : string = '';
  public categoria_producto : any;
  public unidad_medida : any;
  public marca : any;
  public color : any;
  public proveedor : any;
  public insumos : any;
  public id_producto : any;
  public ban : boolean = true;
  public original : any[] = [
    {label:'Si',value:true},
    {label:'No',value:false}
  ]
  uploadedFiles: any[] = [];

  formsProducto = new FormGroup({
    'id': new FormControl(''),
    'descripcion': new FormControl('', Validators.required),
    'stock': new FormControl('', Validators.required),
    'categoria_producto': new FormControl('', Validators.required),
    'precio': new FormControl('', Validators.required),
    'costo': new FormControl('', Validators.required),
    'talle': new FormControl('', Validators.required),
    'original': new FormControl('', Validators.required),
    'marca': new FormControl('', Validators.required),
    'color': new FormControl([]),
    'proveedor': new FormControl(''),
    'insumos': new FormControl([]),
  })

  ngOnInit(): void {
    const datoCompartido = this.ProductoService.datoCompartido;

    this.ObtenerPredefinidos()
    if(datoCompartido == null ){
      this.accion = 'CREACIÓN'
    }else{
      this.accion = 'MODIFICACIÓN'
      this.ArmarFormProducto(datoCompartido)
    }

    this.config.setTranslation({
      'choose' : 'Elegir',
      'upload' : 'Subir',
      'cancel' : 'Cancelar',

    })

    if(this.ProductoService.producto_id != null){
      this.id_producto=this.ProductoService.producto_id;
      this.ban = false;
    }
  }


  constructor(
    public ProductoService : ProductoService,
    public confirmationService : ConfirmationService,
    public router : Router,
    public PredifinidoService : AppService,
    public messageService : MessageService,
    private config: PrimeNGConfig,
    public InsumoService : InsumoService
  ){}


  ArmarFormProducto(datos : any){
    this.formsProducto.patchValue({
      'id': datos.id,
      'descripcion': datos.descripcion,
      'stock': datos.stock,
      'categoria_producto': datos.categoria_producto.id,
      'precio': datos.precio,
      'costo': datos.costo,
      'talle': datos.talle,
      'original': datos.original,
      'marca': datos.marca.id,
      'color': datos.color.map((color : any) => color.id),
    });
  }

  Cancelar(){
    this.ProductoService.datoCompartido = null;
    this.router.navigate(['producto/listado'])
  }

  onUpload(event:any) {
    this.messageService.add({severity: 'info', summary: 'Imagen subida', detail: ''});
  }

  submit() {
console.log(this.formsProducto.value)
      if (this.formsProducto.valid) {
        if (this.accion == 'CREACIÓN') {
          delete this.formsProducto.value.id;
          this.ProductoService.AgregarProducto(this.formsProducto.value)
          .subscribe(res => {
            this.id_producto=res.id;
            this.ban = false;
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
            timer(1000).subscribe(() => {
              this.Cancelar();
            });
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
      this.PredifinidoService.ObtenerPredefinidos()
      .subscribe(
        (res) => {
          this.categoria_producto = res.categoria;
          this.marca = res.marca;
          this.unidad_medida = res.unidad_medida;
          this.color = res.color;
          this.proveedor = res.proveedor;
        })
    }

    ObtenerInsumos(){
      this.InsumoService.ObtenerInsumo()
      .subscribe(
        (res) => {
          this.insumos = res
        })
    }

    CambiaValor(event : any){
      console.log(event)
      if(event.value = true){
        this.ObtenerInsumos()
      }
    }

}
