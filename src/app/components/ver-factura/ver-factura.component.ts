import { Component, OnInit } from '@angular/core';
//servicio para obtener los parametros enviados por la auRL
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.component.html',
  styleUrls: ['./ver-factura.component.css']
})
export class VerFacturaComponent implements OnInit {

  id:string;
  //se activa por inyeccion por dependiencia 
  //primer el import
  constructor(private _sActivatedRoute:ActivatedRoute) { }

  ngOnInit() {
    //obtener el parametro en la URL el parametro que lleva por nombre ':id'
    this.id=this._sActivatedRoute.snapshot.paramMap.get('id');
    console.log(`Id Recibido ==> ${this.id}`);
  }

}
