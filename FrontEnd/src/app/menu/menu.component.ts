import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment as env } from '../../environments/environments';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaComponent } from '../predefinidos/marca/marca.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  public env = env;


  constructor( public router : Router,
     private route: ActivatedRoute){}


    ngOnInit() {

        this.items = [
            {
                label: 'Productos',
                icon: 'pi pi-fw pi-shopping-cart'
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

                      }
                    ]                
                  }
                ]
            },
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-user',
                items : [
                  {
                    label : 'Cambiar contraseña'  ,
                    icon: 'pi pi-fw pi-lock',                  
                  },
                  {
                    label : 'Actualizar datos'  ,
                    icon: 'pi pi-fw pi-user-edit',                  
                  }
                ]
            }
        ];
        this.activeItem = this.items[0];
    }


    onMenuItemClick(item : any) {
        // Acceder al valor del elemento del menú seleccionado
      console.log(item);

      this.activeItem = item;

        switch(item){
        case 'marca' : 
            this.router.navigate(['marca']);
        break;
        case 'color' : 
            this.router.navigate(['color']);
        break;
        case 'unidad_medida' : 
            this.router.navigate(['unidad_medida']);
        break;
        }

     }

}
