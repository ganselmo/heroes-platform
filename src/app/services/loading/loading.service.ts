import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {
  private readonly _loadingState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  hide() {
    this._loadingState.next(false);
  }

  show() {
    this._loadingState.next(true);
  }

  get loading$(): Observable<boolean> {
    return this._loadingState.asObservable();
  }
}
