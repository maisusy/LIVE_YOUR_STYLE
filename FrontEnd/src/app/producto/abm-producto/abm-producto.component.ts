import { Component } from '@angular/core';
import { ProductoService } from '../producto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService , MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';


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
  public id_producto : any;
  public ban : boolean = true;
  public original : any[] = [
    {label:'Si',value:true},
    {label:'No',value:false}
  ]
  uploadedFiles: any[] = [];

  formsProducto = new FormGroup({
    'id': new FormControl(''),
    'nombre': new FormControl('', Validators.required),
    'descripcion': new FormControl('', Validators.required),
    'stock': new FormControl('', Validators.required),
    'categoria_producto': new FormControl('', Validators.required),
    'precio': new FormControl('', Validators.required),
    'costo': new FormControl('', Validators.required),
    'talle': new FormControl('', Validators.required),
    'original': new FormControl('', Validators.required),
    'marca': new FormControl('', Validators.required),
    'color': new FormControl([])
  })

  ngOnInit(): void {
    this.ObtenerPredefinidos()
    console.log(this.formsProducto.value.id)
    if(this.formsProducto.value.id == null || this.formsProducto.value.id == undefined || this.formsProducto.value.id == ''){
      this.accion = 'CREACIÓN'
    }else{
      this.accion = 'MODIFICACIÓN'
    }

    this.config.setTranslation({
      'choose' : 'Elegir',
      'upload' : 'Subir',
      'cancel' : 'Cancelar',

    })
  }

  constructor(
    public ProductoService : ProductoService,
    public confirmationService : ConfirmationService,
    public router : Router,
    public messageService : MessageService,
    private config: PrimeNGConfig,
  ){}

    Cancelar(){
      this.router.navigate(['producto/listado'])
    }

    onUpload(event:any) {
      console.log(event)

      this.messageService.add({severity: 'info', summary: 'Imagen subida', detail: ''});
     
  }

  submit() {

      if (this.formsProducto.valid) {
        if (this.accion == 'CREACIÓN') {
          delete this.formsProducto.value.id;
          this.ProductoService.AgregarProducto(this.formsProducto.value)
          .subscribe(res => {
            this.id_producto=res.id;
            this.ban = false;
            console.log(this.ban)
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
        }
        )
    }

}
