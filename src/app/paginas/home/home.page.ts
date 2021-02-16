import { Component } from '@angular/core';
import {FirestoreService} from 'src/app/services/firestore.service'
import {Tareas} from 'src/app/interfaces/tareas'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tareaEditando : Tareas;
  idTareaSelec: string = null;

  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Tareas
   }];

  constructor(private fireStoreService:FirestoreService) {
      this.tareaEditando = {} as Tareas;
      this.obtenerListaTareas();
 
  }

  obtenerListaTareas(){
    this.fireStoreService.getAllTaras("tareas").subscribe((resultadoConsultaTareas) => {
      console.log(resultadoConsultaTareas);
      this.arrayColeccionTareas = [];
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        console.log(datosTarea);
        console.log(datosTarea.payload.doc.data());
        console.log('entro');
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
    });
  }


  onInsertTask(){
  console.log(this.idTareaSelec);
   if (this.idTareaSelec  == null ) {
    this.fireStoreService.insertar("tareas",this.tareaEditando).then(()=>{
      console.log('Hola se creo Satisfac');
      this.tareaEditando = {} as Tareas;
      
    },(error)=>{
      console.log("entroo con errores");
      console.log(error);
    });
  }else{
    this.fireStoreService.actualizar("tareas",this.idTareaSelec,this.tareaEditando).then(()=>{
      console.log('Hola se actualizo  Satisfactoriamente');
      this.tareaEditando = {} as Tareas;
      this.idTareaSelec  = null;
      
    },(error)=>{
      console.log("entroo con errores");
      console.log(error);
    });
  }
   
  }

  clicBotonCrearNuevo(){
    this.tareaEditando = {} as Tareas;
    this.idTareaSelec = null;
  }
  selecTarea(tareaSelec) {
    console.log("Tarea seleccionada: ");
    console.log(tareaSelec);
    this.idTareaSelec = tareaSelec.id;
    this.tareaEditando.titulo = tareaSelec.data.titulo;
    this.tareaEditando.descripcion = tareaSelec.data.descripcion;
    this.tareaEditando.responsable = tareaSelec.data.responsable;
    
  }

  clicBotonBorrar() {
    this.fireStoreService.borrar("tareas", this.idTareaSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.tareaEditando = {} as Tareas;
    })
  }
}
