import { Component, OnInit , OnDestroy} from '@angular/core';
import { FacturasService } from 'src/app/services/facturas.service';
import {Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

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
  constructor( private _sFactura:FacturasService,
    private _sRouter:Router) { }

  ngOnInit() {
   
  }
  sweetAlertGuardo(){
    Swal.fire({
      title: 'Excelente!',
      text: 'se guardaron los datos correctamente',
      type: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      this._sRouter.navigate(['facturas']);
    })
  } 
  crearFactura(){
    console.log(this.objFactura);
    this.subscriptor=this._sFactura.postFactura(this.objFactura).subscribe((rpta)=>{
      console.log(rpta);
    });
    this.sweetAlertGuardo();
    //this._sRouter.navigate(['facturas']);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    try {
      this.subscriptor.unsubscribe();
    } catch (error) {
      
    }
  }
  

}
