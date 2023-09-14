import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PredefinidosService } from '../../predefinidos.service';

@Component({
  selector: 'app-abm-marca',
  templateUrl: './abm-marca.component.html',
  styleUrls: ['./abm-marca.component.css']
})
export class AbmMarcaComponent {


  @Input() visible: boolean = false;
  @Input() datos: any = null;

  @Output() success = new EventEmitter();

  public accion: string = "";
  public invalid: string = "";

  formsMarca = new FormGroup({
    'id': new FormControl(''),
    'nombre': new FormControl('', Validators.required)
  })

  constructor(
    private messageService: MessageService,
    public MarcaService: PredefinidosService,
  ) { }

  ngOnInit(): void {
  }

  hide() {
    this.formsMarca.reset()
    this.invalid = ""
    this.success.emit()
  }

  show() {

    if (this.datos != null) {
      this.accion = "Actualizar"
      this.formsMarca.setValue(this.datos)
    } else {
      this.accion = "Guardar"
    }
  }

  submit() {
    if (this.formsMarca.valid) {
      if (this.datos == null) {
        delete this.formsMarca.value.id
        this.MarcaService.AgregarMarca(this.formsMarca.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-marca', severity: 'success', summary: `${this.accion} Marca`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-marca', severity: 'error', summary: `${this.accion} Marca`, detail: error.error.error });
        })
      } else {
        let id = Number(this.formsMarca.value.id)
        this.MarcaService.ModificarMarca(id,this.formsMarca.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-marca', severity: 'success', summary: `${this.accion} Marca`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-marca', severity: 'error', summary: `${this.accion} Marca`, detail: error.error.error });
        })
      }
      this.hide()
    } else {
      this.invalid = "ng-dirty"
    }
  }

}
