import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PredefinidosService } from '../../predefinidos.service';


@Component({
  selector: 'app-abm-categoria',
  templateUrl: './abm-categoria.component.html',
  styleUrls: ['./abm-categoria.component.css']
})
export class AbmCategoriaComponent {


  @Input() visible: boolean = false;
  @Input() datos: any = null;

  @Output() success = new EventEmitter();

  public accion: string = "";
  public invalid: string = "";

  formsCategoria = new FormGroup({
    'id': new FormControl(''),
    'nombre': new FormControl('', Validators.required)
  })

  constructor(
    private messageService: MessageService,
    public CategoriaService: PredefinidosService,
  ) { }

  ngOnInit(): void {
  }

  hide() {
    this.formsCategoria.reset()
    this.invalid = ""
    this.success.emit()
  }

  show() {

    if (this.datos != null) {
      this.accion = "Actualizar"
      this.formsCategoria.setValue(this.datos)
    } else {
      this.accion = "Guardar"
    }
  }

  submit() {
    if (this.formsCategoria.valid) {
      if (this.accion == "Guardar") {
        delete this.formsCategoria.value.id
        this.CategoriaService.AgregarCategoria(this.formsCategoria.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-Categoria', severity: 'success', summary: `${this.accion} Categoria`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-Categoria', severity: 'error', summary: `${this.accion} Categoria`, detail: error.error.error });
        })
      } else {
        let id = Number(this.formsCategoria.value.id)
        console.log(this.formsCategoria.value)
        this.CategoriaService.ModificarCategoria(id,this.formsCategoria.value)
        .subscribe(_ => {
          this.messageService.add({ key: 'abm-Categoria', severity: 'success', summary: `${this.accion} Categoria`, detail: 'La acción se realizo correctamente' });
        }, error => {
          console.log(error)
          this.messageService.add({ key: 'abm-Categoria', severity: 'error', summary: `${this.accion} Categoria`, detail: error.error.error });
        })
      }
      this.hide()
    } else {
      this.invalid = "ng-dirty"
    }
  }

}
