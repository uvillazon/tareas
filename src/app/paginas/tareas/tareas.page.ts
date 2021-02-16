import { Component, OnInit } from '@angular/core';
import {Tareas} from 'src/app/interfaces/tareas'
import {FirestoreService} from 'src/app/services/firestore.service'
import { ModaltareaPage } from 'src/app/paginas/modaltarea/modaltarea.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  tareaEditando : Tareas;
  idTareaSelec: string = null;

  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Tareas
   }];
   constructor(private fireStoreService:FirestoreService , private modalController:ModalController) {
    this.tareaEditando = {} as Tareas;
    this.obtenerListaTareas();

  }

  async clickNuevaTarea() {
    const modal = await this.modalController.create({
      component: ModaltareaPage,
      cssClass: 'my-custom-class',
      componentProps:{
        titulo : 'Add Tarea1',
        tareaEdicion : {} as Tareas,
        tituloboton : "Anadir Tarea"
      }
    });
    await modal.present();
    const {data}= await modal.onWillDismiss();
    console.log(data)
  }

  async clickEditTarea(tarea:Tareas , id:string) {
    console.log(tarea);
    console.log("____________________________");
    
    const modal = await this.modalController.create({
      component: ModaltareaPage,
      cssClass: 'my-custom-class',
      componentProps:{
        titulo : 'Editar Tarea',
        tareaEdicion : tarea as Tareas,
        tituloboton : "Modificar Tarea",
        idTareaSelec : id
      }
    });
    await modal.present();
    const {data}= await modal.onWillDismiss();
    console.log(data)
  }


  ngOnInit() {
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
  clickNuevaTare1a1 (){

    console.log("entrarss");
  }

  selecTarea(tareaSelec) {
    console.log("Tarea seleccionada: ");
    console.log(tareaSelec);
    this.idTareaSelec = tareaSelec.id;
    this.tareaEditando.titulo = tareaSelec.data.titulo;
    this.tareaEditando.descripcion = tareaSelec.data.descripcion;
    this.tareaEditando.responsable = tareaSelec.data.responsable;
    
  }

  clicBotonBorrar(id) {
    console.log('borrar');
    this.fireStoreService.borrar("tareas", id).then(() => {
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.tareaEditando = {} as Tareas;
    })
  }

  eliminar(item){
    console.log(item);
  }
  editar(item){
    console.log(item);
  }
}
