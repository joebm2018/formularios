import { Component, OnInit,OnDestroy } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit,OnDestroy {

  facturas;
  subscriptor:Subscription;
  objFactura={
    id:'',
    fact_nro:'',
    fact_rz:'',
    fact_fech:'',
    fact_ruc:''
  };
  constructor( private _sFacturas:FacturasService,
               private _sRouter:Router) { }

  ngOnInit() {
    this.traerFacturas();
  }
  ngOnDestroy(){
    this.subscriptor.unsubscribe();
  }
  traerFacturas(){
    this.subscriptor=this._sFacturas.getFacturas().subscribe((resultado)=>{
      this.facturas=resultado;
    })
  }
  crearFactura(){
    //redireccionar a una ruta distinta 1 - import, inyeccio y como se usa abajo
    this._sRouter.navigate(['facturas','crear']);
  }
  borrarFactura(id){
    // console.log("se esta borrando el id:"+id);
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras Revertir lo Borrado!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this._sFacturas.deleteFactura(id).subscribe((rpta)=>{
          if(rpta.id){
            Swal.fire(
              'Eliminado!',
              'Su factura N° '+id+' ha sido borrado.',
              'success'
            )
          }
          this.traerFacturas();
        });
        
      }
    })
  }
  
  abrirModalEditar(id){

    console.log("hola");
    
    $("#modalEditar").modal("show")
  }
}
