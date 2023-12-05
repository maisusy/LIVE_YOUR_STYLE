import { VentasService } from './../ventas/ventas.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { environment as env } from '../../environments/environments';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers : [ConfirmationService,MessageService]
})
export class MenuComponent implements OnInit, OnDestroy{

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  public env = env;
  public username: any;
  dialogVisible: boolean = false;
  private productosSubscription: Subscription | undefined;
  public productos : any = [];
  public modalDatos : any;
  public modal : string = "";

  constructor( public router : Router,
     private AppService : AppService,
     public VentasService : VentasService,
     public confirmationService : ConfirmationService,
     ){}


    ngOnInit() {
      this.cargaItemsMenu()
      this.productosSubscription = this.AppService.ObtenerProductoActualizado().subscribe(() => {
        this.showDialog();
      });
    }

    ngOnDestroy() {
      // Desuscribirse para evitar posibles fugas de memoria
      if (this.productosSubscription) {
        this.productosSubscription.unsubscribe();
      }
    }

    success(){
      this.modal = '';
    }

    MODAL(tipo : string , datos : any = null){
      let data = {
        producto_id : datos.producto_id,
        descripcion : datos.descripcion,
        precio : datos.precio,
        cantidad : datos.cantidad,
        costo_total : datos.precio * datos.cantidad,
        estado : 'ACTUALIZAR',
        stock : datos.stock
      }
      this.modal = tipo;
      this.modalDatos = data;
    }

    Confirmar(event : Event, id : number ){
      this.confirmationService.confirm({
        target: event.target!,
          message: '¿Estas seguro?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.AppService.productos = this.AppService.productos.filter((valor: any) => valor.producto_id != id);

            console.log('datos después de eliminar', this.AppService.productos);
            this.AppService.NotificarMenu();
          },
          reject: () => {
              //reject action
        }
    });
  }
    showDialog() {
      console.log('Mostrando el diálogo con productos:', this.AppService.productos);
      this.productos = this.AppService.productos;
      this.dialogVisible = true;
    }

    CancelarCompra(){
      this.AppService.productos = [];
      this.dialogVisible=false;
    }

    Comprar(){
    }

    cargaItemsMenu(){
        this.username = localStorage.getItem('username');
        this.items = []
        this.items = [
          {
              label: 'Inicio',
              icon: 'pi pi-fw pi-home',
              command : () => {
                this.onMenuItemClick('inicio')
              }
          },
          {
              label: 'Productos',
              icon: 'pi pi-fw pi-shopping-cart',
              command : () => {
                this.onMenuItemClick('producto')
              }
          },
      ];

      console.log(this.username)
      if(this.username != null && this.username !== ''){
        let data_admin = {
          label: 'Administracion',
          icon: 'pi pi-fw pi-cog',
          items : [
            {
              label : 'Productos'  ,
              icon: 'pi pi-fw pi-list',
              items : [
                  {
                    label : 'Nuevo'  ,
                    icon: 'pi pi-fw pi-plus', command : () => {
                      this.onMenuItemClick('abm-productos')
                    },
                  },
                  {
                    label : 'Listado'  ,
                    icon: 'pi pi-fw pi-list',
                    command : () => {
                      this.onMenuItemClick('Listado Productos')
                    },
                  }
                ],
            }, {
              label : 'Proveedores'  ,
              icon: 'pi pi-fw pi-list',
              command : () => {
                      this.onMenuItemClick('proveedor')
              }
            },{
              label : 'Insumos'  ,
              icon: 'pi pi-fw pi-list',
              command : () => {
                      this.onMenuItemClick('insumo')
              }
            },
            {
              label : 'Listado Predefinidos'  ,
              icon: 'pi pi-fw pi-list',
              items : [
                {
                  label:'Marcas',
                  icon: 'pi pi-fw pi-plus',
                  command : () => {
                    this.onMenuItemClick('marca')
                  }
                },
                {
                  label:'Colores',
                  icon: 'pi pi-fw pi-plus',
                  command : () => {
                    this.onMenuItemClick('color')
                  }
                },
                {
                  label:'Unidades de Medida',
                  icon: 'pi pi-fw pi-plus',
                  command : () => {
                    this.onMenuItemClick('unidad_medida')
                  }
                },
                {
                  label:'Categoria',
                  icon: 'pi pi-fw pi-plus',
                  command : () => {
                    this.onMenuItemClick('categoria')
                  }
                }
              ]
            }
          ]
           };
        this.items.push(data_admin)

        let data_turno =  {
            label: 'Turnos',
            icon: 'pi pi-fw pi-calendar',
            items : [
              {
                label : 'Agendar Turno'  ,
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label : 'Listado'  ,
                icon: 'pi pi-fw pi-calendar-minus',
              },
              {
                label : 'Mis turnos'  ,
                icon: 'pi pi-fw pi-calendar-minus',
              }
            ]
        }

        this.items.push(data_turno)

        let data_usuario  =  {
          label: this.username,
          icon: 'pi pi-fw pi-user',
          items : [
            {
              label : 'Cambiar contraseña'  ,
              icon: 'pi pi-fw pi-lock',
              command : () => {
                this.onMenuItemClick('cambiar-contrasenia')
              }
            },
            {
              label : 'Actualizar datos'  ,
              icon: 'pi pi-fw pi-user-edit',
            },
            {
              label : 'Cerrar Sesión'  ,
              icon: 'pi pi-fw pi-sign-out',
              command : () => {
                this.onMenuItemClick('cerrar sesion')
              }
            }
          ]
        }
        this.items.push(data_usuario)
      }else{
        let data =  {
          label: 'Iniciar Sesión',
          icon: 'pi pi-fw pi-sign-in',
          command : () => {
            this.onMenuItemClick('login')
          }
        }
        this.items.push(data)
      }

      this.activeItem = this.items[0];
    }


    onMenuItemClick(item : any) {

      this.activeItem = item;

      switch(item){
        case 'insumo':
            this.router.navigate(['insumo']);
        break;
        case 'abm-productos':
            this.router.navigate(['producto/abm-producto']);
        break;
        case 'proveedor':
            this.router.navigate(['proveedor']);
        break;
        case 'cambiar-contrasenia':
            this.router.navigate(['usuario/cambiar-contrasenia']);
        break;
        case 'cerrar sesion' :
          localStorage.setItem('token',  '');
          localStorage.setItem('username',  '');
          this.cargaItemsMenu();
          this.router.navigate(['inicio']);
        break;
        case 'login' :
            this.router.navigate(['login']);
        break;
        case 'Listado Productos' :
            this.router.navigate(['producto/listado']);
        break;
        case 'marca' :
            this.router.navigate(['marca']);
        break;
        case 'marca' :
            this.router.navigate(['marca']);
        break;
        case 'color' :
            this.router.navigate(['color']);
        break;
        case 'unidad_medida' :
            this.router.navigate(['unidad_medida']);
        break;
        case 'inicio' :
            this.router.navigate(['inicio']);
        break;
        case 'producto' :
            this.router.navigate(['producto']);
        break;
        case 'categoria' :
            this.router.navigate(['categoria']);
        break;
        }

     }

}
