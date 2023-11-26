import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-abm-proveedor',
  templateUrl: './abm-proveedor.component.html',
  styleUrls: ['./abm-proveedor.component.css']
})
export class AbmProveedorComponent {


  @Input() visible: boolean = false;
  @Input() datos: any = null;

  @Output() success = new EventEmitter();

  public accion: string = "";
  public invalid: string = "";

  formProveedor = new FormGroup({
    'id': new FormControl(''),
    'razon_social': new FormControl('', Validators.required),
    'cuit': new FormControl('', Validators.required),
    'obs': new FormControl('', Validators.required)
  })

  constructor(
    private messageService: MessageService,
    public ProveedorService: ProveedorService,
  ) { }

  ngOnInit(): void {
  }

  hide() {
    this.formProveedor.reset()
    this.invalid = ""
    this.success.emit()
  }

  show() {

    if (this.datos != null) {
      this.accion = "Actualizar"
      this.formProveedor.setValue(this.datos)
    } else {
      this.accion = "Guardar"
    }
  }

  submit() {
    if (this.formProveedor.valid) {
      if (this.accion == "Guardar") {
        delete this.formProveedor.value.id
        this.ProveedorService.AgregarProveedor(this.formProveedor.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-proveedor', severity: 'success', summary: `${this.accion} PROVEEDOR`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-proveedor', severity: 'error', summary: `${this.accion} PROVEEDOR`, detail: error.error.error });
        })
      } else {
        let id = Number(this.formProveedor.value.id)
        console.log(this.formProveedor.value)
        this.ProveedorService.ModificarProveedor(id,this.formProveedor.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-proveedor', severity: 'success', summary: `${this.accion} PROVEEDOR`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-proveedor', severity: 'error', summary: `${this.accion} PROVEEDOR`, detail: error.error.error });
        })
      }
      this.hide()
    } else {
      this.invalid = "ng-dirty"
    }
  }

}
