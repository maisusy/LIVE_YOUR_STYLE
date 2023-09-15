import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PredefinidosService } from '../../predefinidos.service';

@Component({
  selector: 'app-abm-unidad-medida',
  templateUrl: './abm-unidad-medida.component.html',
  styleUrls: ['./abm-unidad-medida.component.css']
})
export class AbmUnidadMedidaComponent {


  @Input() visible: boolean = false;
  @Input() datos: any = null;

  @Output() success = new EventEmitter();

  public accion: string = "";
  public invalid: string = "";

  formsUnidadMedida = new FormGroup({
    'id': new FormControl(''),
    'nombre': new FormControl('', Validators.required)
  })

  constructor(
    private messageService: MessageService,
    public UnidadMedidaService: PredefinidosService,
  ) { }

  ngOnInit(): void {
  }

  hide() {
    this.formsUnidadMedida.reset()
    this.invalid = ""
    this.success.emit()
  }

  show() {

    if (this.datos != null) {
      this.accion = "Actualizar"
      this.formsUnidadMedida.setValue(this.datos)
    } else {
      this.accion = "Guardar"
    }
  }

  submit() {
    if (this.formsUnidadMedida.valid) {
      if (this.accion == "Guardar") {
        delete this.formsUnidadMedida.value.id
        console.log(this.formsUnidadMedida.value)
        this.UnidadMedidaService.AgregarUnidadMedida(this.formsUnidadMedida.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-unidad_medida', severity: 'success', summary: `${this.accion} UNIDAD MEDIDA`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-unidad_medida', severity: 'error', summary: `${this.accion} UNIDAD MEDIDA`, detail: error.error.error });
        })
      } else {
        let id = Number(this.formsUnidadMedida.value.id)
        this.UnidadMedidaService.ModificarUnidadMedida(id,this.formsUnidadMedida.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-unidad_medida', severity: 'success', summary: `${this.accion} UNIDAD MEDIDA`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-unidad_medida', severity: 'error', summary: `${this.accion} UNIDAD MEDIDA`, detail: error.error.error });
        })
      }
      this.hide()
    } else {
      this.invalid = "ng-dirty"
    }
  }


}
