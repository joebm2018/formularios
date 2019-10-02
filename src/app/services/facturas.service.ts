import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private _sHttp:HttpClient) { }

  getFacturas():Observable<any>{
    return this._sHttp.get("https://5d93e868e020b300147db0f0.mockapi.io/facturas")
  }
}
