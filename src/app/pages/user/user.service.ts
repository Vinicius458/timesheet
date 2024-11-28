import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  orderBy,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { APP_CONSTANTS } from '@shared/constants';
import { User } from './user.interface';
import {
  catchError,
  combineLatest,
  concatMap,
  from,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _firestore = inject(Firestore);
  private readonly _userCollection = collection(
    this._firestore,
    APP_CONSTANTS.COLLECTION_NAME
  );

  newUser(
    user: Partial<User>
  ): Promise<DocumentReference<DocumentData, DocumentData>> {
    return addDoc(this._userCollection, {
      created: Date.now(),
      updated: Date.now(),
      ...user,
    });
  }

  verifyAndCreateUser(user: Partial<User>): Promise<string> {
    return new Promise((resolve, reject) => {
      combineLatest([
        this.checkCpfExists(user.cpf!),
        this.checkUserCodeExists(user.userCode!),
      ])
        .pipe(
          concatMap(([cpfExists, codigoExists]) => {
            if (cpfExists) {
              return throwError(() => new Error('Este CPF já foi cadastrado'));
            } else if (codigoExists) {
              return throwError(
                () => new Error('O Código de usuário já existe')
              );
            } else {
              return from(this.newUser(user)).pipe(
                map(() => 'Usuário criado com sucesso')
              );
            }
          }),
          catchError((error) => {
            reject(error.message || 'Erro ao criar usuário');
            return of(null);
          })
        )
        .subscribe({
          next: (message) => {
            resolve(message!);
          },
          error: (error) => {
            reject(error);
          },
        });
    });
  }

  getAllUsers(): Observable<User[]> {
    const queryFn = query(this._userCollection, orderBy('created', 'desc'));
    return collectionData(queryFn, { idField: 'id' }) as Observable<User[]>;
  }

  checkCpfExists(cpf: string): Observable<Boolean> {
    const queryFn = query(this._userCollection, where('cpf', '==', cpf));
    return collectionData(queryFn, { idField: 'id' }).pipe(
      map((changes: Array<User>) => changes.length > 0),
      catchError((error) => {
        return [false];
      })
    );
  }
  checkUserCodeExists(userCode: string): Observable<Boolean> {
    const queryFn = query(
      this._userCollection,
      where('userCode', '==', userCode)
    );
    return collectionData(queryFn, { idField: 'id' }).pipe(
      map((changes: Array<User>) => changes.length > 0),
      catchError((error) => {
        return [false];
      })
    );
  }

  async getUserById(id: string): Promise<User> {
    const docRef = this._getDocRef(id);
    const documentData = await getDoc(docRef);
    return documentData.data() as User;
  }

  updateUser(id: string, user: User): void {
    const docRef = this._getDocRef(id);
    updateDoc(docRef, { ...user });
  }

  deleteUser(id: string): void {
    const docRef = this._getDocRef(id);
    deleteDoc(docRef);
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME, id);
  }
}
