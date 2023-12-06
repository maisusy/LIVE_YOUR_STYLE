import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InsumoService } from '../insumo.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-abm-insumo',
  templateUrl: './abm-insumo.component.html',
  styleUrls: ['./abm-insumo.component.css']
})
export class AbmInsumoComponent {

  @Input() visible: boolean = false;
  @Input() datos: any = null;

  @Output() success = new EventEmitter();

  public accion: string = "";
  public invalid: string = "";
  public unidad_medida : any;
  public marca : any;
  public color : any;
  public proveedor : any;

  formInsumo = new FormGroup({
    'id': new FormControl(''),
    'descripcion': new FormControl('', Validators.required),
    'tipo': new FormControl('-'),
    'unidad_medida': new FormControl('', Validators.required),
    'stock': new FormControl('', Validators.required),
    'costo': new FormControl('', Validators.required),
    'marca': new FormControl('', Validators.required),
    'color': new FormControl('', Validators.required),
    'proveedor': new FormControl('', Validators.required)
  })

  constructor(
    private messageService: MessageService,
    public InsumoService: InsumoService,
    public PredifinidoService : AppService,
  ) { }

  ngOnInit(): void {
    this.ObtenerPredefinidos()
  }

  hide() {
    this.formInsumo.reset()
    this.invalid = ""
    this.success.emit()
  }

  show() {

    if (this.datos != null) {
      this.accion = "Actualizar"
      this.ArmarFormProducto(this.datos)
    } else {
      this.accion = "Guardar"
    }
  }

  ArmarFormProducto(datos : any){
    this.formInsumo.patchValue({
      'id': datos.id,
      'descripcion': datos.descripcion,
      'stock': datos.stock,
      'unidad_medida': datos.unidad_medida.id,
      'tipo': datos.tipo,
      'costo': datos.costo,
      'marca': datos.marca.id,
      'proveedor': datos.proveedor.id,
      'color': datos.color.map((color : any) => color.id),
    });
  }

  submit() {
    if(this.formInsumo.value.tipo == null){
      this.formInsumo.value.tipo = "-"
    }
    if (this.formInsumo.valid) {
      if (this.accion == "Guardar") {
        delete this.formInsumo.value.id;
        this.InsumoService.AgregarInsumo(this.formInsumo.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-insumo', severity: 'success', summary: `${this.accion} INSUMO`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-insumo', severity: 'error', summary: `${this.accion} INSUMO`, detail: error.error.error });
        })
      } else {
        let id = Number(this.formInsumo.value.id)
        this.InsumoService.ModificarInsumo(id,this.formInsumo.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-insumo', severity: 'success', summary: `${this.accion} INSUMO`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-insumo', severity: 'error', summary: `${this.accion} INSUMO`, detail: error.error.error });
        })
      }
      this.hide()
    } else {
      this.invalid = "ng-dirty"
    }
  }

  ObtenerPredefinidos(){
    this.PredifinidoService.ObtenerPredefinidos()
    .subscribe(
      (res) => {
        this.proveedor = res.proveedor;
        this.marca = res.marca;
        this.unidad_medida = res.unidad_medida;
        this.color = res.color;
        console.log(res)
      }
      )
  }
}
