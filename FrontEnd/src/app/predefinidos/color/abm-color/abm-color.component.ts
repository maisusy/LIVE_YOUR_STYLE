import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PredefinidosService } from '../../predefinidos.service';

@Component({
  selector: 'app-abm-color',
  templateUrl: './abm-color.component.html',
  styleUrls: ['./abm-color.component.css']
})
export class AbmColorComponent {


  @Input() visible: boolean = false;
  @Input() datos: any = null;

  @Output() success = new EventEmitter();

  public accion: string = "";
  public invalid: string = "";

  formsColor = new FormGroup({
    'id': new FormControl(''),
    'nombre': new FormControl('', Validators.required),
    'tono': new FormControl('', Validators.required)
  })

  constructor(
    private messageService: MessageService,
    public ColorService: PredefinidosService,
  ) { }

  ngOnInit(): void {
  }

  hide() {
    this.formsColor.reset()
    this.invalid = ""
    this.success.emit()
  }

  show() {

    if (this.datos != null) {
      this.accion = "Actualizar"
      this.formsColor.setValue(this.datos)
    } else {
      this.accion = "Guardar"
    }
  }

  submit() {
    if (this.formsColor.valid) {
      if (this.accion == "Guardar") {
        delete this.formsColor.value.id
        this.ColorService.AgregarColor(this.formsColor.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-color', severity: 'success', summary: `${this.accion} COLOR`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-color', severity: 'error', summary: `${this.accion} COLOR`, detail: error.error.error });
        })
      } else {
        let id = Number(this.formsColor.value.id)
        console.log(this.formsColor.value)
        this.ColorService.ModificarColor(id,this.formsColor.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-color', severity: 'success', summary: `${this.accion} COLOR`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-color', severity: 'error', summary: `${this.accion} COLOR`, detail: error.error.error });
        })
      }
      this.hide()
    } else {
      this.invalid = "ng-dirty"
    }
  }
}
