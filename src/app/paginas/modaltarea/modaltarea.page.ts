import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tareas } from 'src/app/interfaces/tareas';
import {FirestoreService} from 'src/app/services/firestore.service'


@Component({
  selector: 'app-modaltarea',
  templateUrl: './modaltarea.page.html',
  styleUrls: ['./modaltarea.page.scss'],
})
export class ModaltareaPage implements OnInit {
  @Input() titulo:string;
  @Input() tareaEdicion:Tareas;
  @Input() tituloboton:string;
  @Input() idTareaSelec:string;
  tareaEditando : Tareas;

  constructor(private modalController:ModalController , private fireStoreService:FirestoreService) {

    this.tareaEditando = {} as Tareas;
   }

  ngOnInit() {
    console.log('ngOnInit');
    this.tareaEditando = this.tareaEdicion;
    console.log(this.tareaEdicion);
  }

  salir(){
    console.log(this.tareaEditando);
    this.modalController.dismiss();
  }
  salirSinArgumentos(){
    this.modalController.dismiss();
  }
  salirConArgumentos(){
    this.modalController.dismiss({
      nombre:"hijo",
      pais:"Colombia"
    });
  }
  clickAddUpdateTask(){
    if(typeof( this.tareaEdicion ) === "undefined"){
      this.fireStoreService.insertar("tareas",this.tareaEditando).then(()=>{
        console.log('Hola se creo Satisfac');

        console.log(this.tareaEditando);
        this.tareaEditando = {} as Tareas;
        this.modalController.dismiss();
        
        
      },(error)=>{
        console.log("entroo con errores");
        console.log(error);
      });
    }
    else{
      this.fireStoreService.actualizar("tareas",this.idTareaSelec,this.tareaEditando).then(()=>{
        console.log('Hola se actualizo  Satisfactoriamente');
        this.tareaEditando = {} as Tareas;
        this.idTareaSelec  = null;
        this.modalController.dismiss();
        
      },(error)=>{
        console.log("entroo con errores");
        console.log(error);
      });
    }
  }
}
