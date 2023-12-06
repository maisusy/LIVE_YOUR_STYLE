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
  public color : any = [];
  public proveedor : any;
  public insumos : any = [];
  public insumos_listado : any = [];
  public id_producto : any;
  public ban : boolean = true;
  public modalDatos : any;
  public modal : string = "";
  public original : any[] = [
    {label:'Si',value:true},
    {label:'No',value:false}
  ]
  uploadedFiles: any[] = [];

  formsProducto = new FormGroup({
    'id': new FormControl(null),
    'descripcion': new FormControl('', Validators.required),
    'stock': new FormControl(1, Validators.required),
    'categoria_producto': new FormControl('', Validators.required),
    'precio': new FormControl(0, Validators.required),
    'costo': new FormControl(0, Validators.required),
    'talle': new FormControl('', Validators.required),
    'original': new FormControl(false , Validators.required),
    'marca': new FormControl(0, Validators.required),
    'color': new FormControl([]),
    'proveedor': new FormControl(null),
    'insumos': new FormControl([]),
  })

  ngOnInit(): void {
    const datoCompartido = this.ProductoService.datoCompartido;
    console.log('datoCompartido',datoCompartido)
    this.ObtenerPredefinidos()

    if(datoCompartido == null ){
      this.accion = 'CREACIÓN'
    }else{
      this.accion = 'MODIFICACIÓN'
      if(datoCompartido.original == true){
        this.insumos = this.ProductoService.insumos;
        this.ObtenerInsumo(datoCompartido)
      }else{
        this.ArmarFormProducto(datoCompartido)
      }
    }

    this.config.setTranslation({
      'choose' : 'Elegir Imagen',
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
      'proveedor': datos.proveedor?.id || null,
      'insumos' : []
    });

    if(datos.original == true){
      datos.insumos.forEach( (valor:any) => {
        let data = this.insumos_listado.filter( (ins:any) => valor.insumo == ins.id)
        valor.descripcion = data.map((valor:any) => valor.descripcion);
        this.insumos.push(valor);
      })
    }
  }

  ObtenerInsumo(datoCompartido : any){
    this.InsumoService.ObtenerInsumo()
    .subscribe(
      (res) => {
        this.insumos_listado = res
        this.ArmarFormProducto(datoCompartido)
        this.DeshabilitarCostos_Marca()
      }
    )
  }

  Cancelar(){
    this.ProductoService.datoCompartido = null;
    this.ProductoService.insumos= [];
    this.router.navigate(['producto/listado'])
  }

  onUpload(event:any) {
    this.messageService.add({severity: 'info', summary: 'Imagen subida', detail: ''});
  }

  Quitar(id : number){
    this.insumos = this.insumos.filter((item:any) => item.insumo !== id);
    console.log(id)
    console.log(this.insumos)
    this.ProductoService.insumos = this.insumos;
  }

  success(){
    this.modal = '';
    this.insumos = this.ProductoService.insumos;
    this.DeshabilitarCostos_Marca()
  }

  DeshabilitarCostos_Marca(){

    let costo : number = 0;
    if(this.insumos.length > 0 ){
      this.insumos.forEach((valor:any)=> {
        costo = costo + valor.costo_total;
      })
    }

    const costoControl = this.formsProducto.get('costo');
    if (costoControl) {
      costoControl.enable();
      costoControl.disable();
      costoControl.setValue(costo);

    }

    const marcaControl = this.formsProducto.get('marca');
    if (marcaControl) {
      marcaControl.enable();
      marcaControl.disable();
      marcaControl.setValue(21);

    }



  }

  CambiaValor(event :any){
    if(event.value){ /* ES ORIGINAL */
      this.formsProducto.value.proveedor = null;
      this.DeshabilitarCostos_Marca()
    }else{ /* NO ES ORIGINAL */

      const costoControl = this.formsProducto.get('costo');
      if (costoControl) {
          costoControl.enable();
      }
      const marcaControl = this.formsProducto.get('marca');
      if (marcaControl) {
          marcaControl.enable();
      }


      this.formsProducto.value.insumos = [];
    }
  }

  MODAL(tipo : string , modal : any = null ){
    this.modal = tipo;
    this.modalDatos = modal;
  }

  PrepararArrayInsumo(id : any){

    let costo : number = 0;
     if(this.insumos.length > 0 ){
       this.insumos.forEach((valor:any)=> {
         costo = costo + valor.costo_total;
       })
     }

     const costoControl = this.formsProducto.get('costo');
     const marcaControl = this.formsProducto.get('marca');
     if (costoControl && marcaControl) {

       if(this.formsProducto.value.original == true ){
          costoControl.enable();
          costoControl.setValue(costo);

          marcaControl.enable();
          marcaControl.setValue(21);

          this.formsProducto.value.proveedor = null;
           if (this.accion == 'CREACIÓN') {
             this.formsProducto.value.insumos = this.insumos.map((valor:any) => { return {
               insumo: valor.insumo,
               costo_total: valor.costo_total,
               cantidad: valor.cantidad
             };
           });
         }else{
           this.formsProducto.value.insumos = this.insumos.map((valor:any) => { return {
             insumo: valor.insumo,
             costo_total: valor.costo_total,
             cantidad: valor.cantidad,
             producto : id
           };
         });
         }

       }
     }
    console.log('PrepararArrayInsumo',this.formsProducto.value)

    return this.formsProducto.value;

  }

  submit() {
      console.log('SUBMIT ',this.formsProducto.value)
      if (this.formsProducto.valid) {
        if (this.formsProducto.value.id == null) {
          this.ProductoService.AgregarProducto(this.PrepararArrayInsumo(null))
          .subscribe(res => {
            this.id_producto=res.id;
            this.ban = false;
            this.messageService.add({ key: 'abm-producto', severity: 'success', summary: `${this.accion} PRODUCTO`, detail: 'La acción se realizo correctamente' });

          }, error => {
            console.log(error)
            this.messageService.add({ key: 'abm-producto', severity: 'error', summary: `${this.accion} PRODUCTO`, detail: error.error.error });
          })
        } else { /* ACTUALIZAR */
          let id = Number(this.formsProducto.value.id)

          this.PrepararArrayInsumo(id)
          console.log('this.formsProducto.value',this.formsProducto.value)
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
        res.color.forEach( (valor:any) => {
          console.log()
          this.color.push({'id':valor.id,'nombre':valor.nombre + ' - ' + valor.tono})
        })
        this.proveedor = res.proveedor;
      })
  }

}
