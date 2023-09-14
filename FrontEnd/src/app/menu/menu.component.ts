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


  constructor(private router: Router,
     private route: ActivatedRoute){}


    ngOnInit() {
        this.items = [
            {
                label: 'Productos',
                icon: 'pi pi-fw pi-file'
            },
            {
                label: 'Turnos',
                icon: 'pi pi-fw pi-file',
                items : [
                  {
                    label : 'Agendar Turno'  ,
                    icon: 'pi pi-fw pi-plus',                  
                  },
                  {
                    label : 'Listado'  ,
                    icon: 'pi pi-fw pi-plus',                  
                  },
                  {
                    label : 'Mis turnos'  ,
                    icon: 'pi pi-fw pi-plus',                  
                  }
                ]
            },
            
            {
                label: 'Administracion',
                icon: 'pi pi-fw pi-pencil',
                items : [
                  {
                    label : 'Listado Predefinidos'  ,
                    icon: 'pi pi-fw pi-plus',                  
                  }
                ]
            },
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-user',
                items : [
                  {
                    label : 'Cambir contraseña'  ,
                    icon: 'pi pi-fw pi-plus',                  
                  },
                  {
                    label : 'Actualizar datos'  ,
                    icon: 'pi pi-fw pi-plus',                  
                  }
                ]
            }
        ];
        this.activeItem = this.items[0];
    }

    onActiveItemChange(event: MenuItem) {



        this.activeItem = event;
        console.log(event.label)
        switch(event.label){
        case 'Productos' : 
            this.router.navigate(['productos']);
        break;
        case 'Turnos' : 
            this.router.navigate(['turnos']);
        break;
        case 'Administracion' : 
            this.router.navigate(['admin']);
        break;
        case 'Usuarios' : 
            this.router.navigate(['usuarios']);
        break;
    }

        console.log('aaaa', event.label )
     }

}
