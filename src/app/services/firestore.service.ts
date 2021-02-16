import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFireStore:AngularFirestore) { }

  insertar(coleccion, datos){
    return this.angularFireStore.collection(coleccion).add(datos);
  }
  getAllTaras(coleccion){
    // return this.angularFireStore.collection(coleccion).get();
    return this.angularFireStore.collection(coleccion,ref => ref.orderBy('titulo','asc')) .snapshotChanges();

//     .collection("tareas")
// .orderBy("titulo", "asc")
  }

  public borrar(coleccion, documentId) {
    return this.angularFireStore.collection(coleccion).doc(documentId).delete();
  }

  actualizar(coleccion , id , datos){
    // return this.angularFireStore.collection(coleccion).doc(id).update(datos);
    return this.angularFireStore.collection(coleccion).doc(id).set(datos);
    
  }
}
