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
  facturasSeleccionadas:Array<any>=[];
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
    console.time("tiempo");
    Swal.fire({
      type:'info',
      title:'Espere un Momento',
      html:`<h2 class="display-3">Espere un momento</h2>
      <i class="fa fa-refresh fa-3x fa-spin" ></i><br>
      <p>Esperando al Servidor</p>`,
      allowOutsideClick:false,
      showConfirmButton:false
    })
    this._sFacturas.getFactura(id).subscribe((resultado)=>{
      Swal.close();
      console.log(resultado);
      console.timeEnd("tiempo");
      if (resultado.id){
        this.objFactura=resultado;
        $("#modalEditar").modal("show");
      }
      // this.objFactura.id=resultado.id;
      // this.objFactura.fact_nro=resultado.fact_nro;
      // this.objFactura.fact_fech=resultado.fact_fech;
      // this.objFactura.fact_ruc=resultado.fact_ruc;
      // this.objFactura.fact_rz=resultado.fact_rz;
    })
    
  }
  actualizarFactura(objFactura){
    //consumir el servicio para editar la factura
    // console.log(`el id a modificar es: ${objid}`);
    
    this._sFacturas.putFactura(this.objFactura).subscribe((resultado)=>{
      if(resultado.id){
        //factura correactamente editado
        this.traerFacturas();
        $("#modalEditar").modal("hide");
      }
    })
    
  }
  seleccionarFactura(evento,factura){
    if(evento.target.checked){
      this.facturasSeleccionadas.push(factura);
      console.log(this.facturasSeleccionadas);
    }else{
      
      for (let i = 0; i < this.facturasSeleccionadas.length; i++) {
          if(factura.id==this.facturasSeleccionadas[i].id){
            // array.splice(posicion,cantElementos)
            this.facturasSeleccionadas.splice(i,1);
            console.log(this.facturasSeleccionadas);
            
          }   
      }
    }
  }
  eliminarFacturas(){
      Swal.fire({
      title: 'Estas seguro de borrar estas facturas?',
      text: "No podras Revertir lo Borrado!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this._sFacturas.deleteFacturas(this.facturasSeleccionadas).subscribe((rpta)=>{
          if(rpta[0].id){
            Swal.fire(
              'Eliminado!',
              'Su facturas han sido borradas.',
              'success'
            )
          }
          this.facturasSeleccionadas=[];
          this.traerFacturas();
        });
        
      }
    })
  }
}

