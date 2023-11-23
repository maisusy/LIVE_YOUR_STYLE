import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment as env } from '../../environments/environments';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  public env = env;
  public username: any;


  constructor( public router : Router,
     private route: ActivatedRoute){}


    ngOnInit() {
      this.cargaItemsMenu()
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
          {
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
          },
          {
              label: 'Administracion',
              icon: 'pi pi-fw pi-cog',
              items : [
                {
                  label : 'Listado Productos'  ,
                  icon: 'pi pi-fw pi-list',  
                  command : () => {
                    this.onMenuItemClick('Listado Productos')
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
          },
      ];

      console.log(this.username)
      if(this.username != null && this.username !== ''){
        let data  =  {
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

        this.items.push(data)
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
