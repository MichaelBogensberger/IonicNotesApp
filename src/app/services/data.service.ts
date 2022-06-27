import { Injectable } from '@angular/core';
import {
  collectionData,
  docData,
  Firestore,
  addDoc,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { NumericValueAccessorDirective } from '@ionic/angular/directives/control-value-accessors/numeric-value-accesssor';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getNotes() {
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef, { idField: 'id' });
  }

  getNoteById(id): Observable<Note> {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
  }

  addNote(note: Note) {
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  deleteNote(note: Note) {
    const notesRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(notesRef);
  }

  updateNote(note: Note) {
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, { title: note.title, text: note.text });
  }

}
