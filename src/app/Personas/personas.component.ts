import { Component } from '@angular/core';
import { Persona } from './persona';
import Swal from 'sweetalert2';
import { PersonaService } from './PersonaService';

@Component({
  selector: 'app-personas',
  templateUrl: './PersonasComponent'
})
export class PersonasComponent {
  personas: Persona[] = [];

  ngOnInit(): void {
    this.refresh();
  }

  constructor(private personaService: PersonaService) { }

  refresh (){
    this.personaService.getPersonas().subscribe(
      personas => this.personas = personas
    );
  }

  eliminarPersona(identificacion: String){
    if (identificacion != null) {
      this.personaService.eliminarPersona(identificacion)
        .subscribe(
          err => {
            console.log(err);
            Swal.fire(err.error.error.toString(), err.error.mensaje.toString(), 'warning');
          }
        ).add(() => {
          Swal.fire('Persona Eliminada', 'Eliminado exitosamente', 'success');
        });
    }
    else {
      Swal.fire('Error: ', 'Identificación no válida', 'warning');
    }
  }
}
