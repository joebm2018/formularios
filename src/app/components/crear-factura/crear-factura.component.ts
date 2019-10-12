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
  // sweetAlertGuardo(){
  //   Swal.fire({
  //     title: 'Excelente!',
  //     text: 'se guardaron los datos correctamente',
  //     type: 'success',
  //     confirmButtonText: 'Aceptar'
  //   })
  // } 
  crearFactura(){
    Swal.fire({
      title:'Espere un momento',
      text:'Estamos Registrando la Factura',
      type:'info',
      allowOutsideClick:false,
      showConfirmButton:false
    })
    
    this.subscriptor=this._sFactura.postFactura(this.objFactura).subscribe((rpta)=>{
      if (rpta.id){
        // si tiene un campo id asignado implica que el objeto ha sido creado
        Swal.fire({
          title:'Éxito',
          type:'success',
          text:'La factura ha sido creada con exito mafren',
          confirmButtonText:'Aceptar',
          allowOutsideClick:false //no permite que se haga click fuera del alert
        }).then((result)=>{
          if (result.value){
            this._sRouter.navigate(['facturas']);
          }
        });
      }
    });
  
  }
  ngOnDestroy() {
    try {
      this.subscriptor.unsubscribe();
    } catch (error) {
      
    }
  }
  
}
