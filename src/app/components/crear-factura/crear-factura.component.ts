import { Component, OnInit } from '@angular/core';

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
  constructor( ) { }

  ngOnInit() {
    
  }

}
