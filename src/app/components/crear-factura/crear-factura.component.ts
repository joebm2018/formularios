import { Component, OnInit , OnDestroy} from '@angular/core';
import { FacturasService } from 'src/app/services/facturas.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

 
  objFactura={
    fact_nro:'',
    fact_ruc:'',
    fact_rx:'',
    fact_fech:''
  }
  subscriptor:Subscription;
  constructor( private _sFactura:FacturasService) { }

  ngOnInit() {
   
  }
  crearFactura(){
    console.log(this.objFactura);
    this.subscriptor=this._sFactura.postFactura(this.objFactura).subscribe((rpta)=>{
      console.log(rpta);
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptor.unsubscribe();
  }

}
