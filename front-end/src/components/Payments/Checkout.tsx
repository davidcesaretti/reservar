import * as React from 'react';
import "./Checkout.css"


export default function checkout() {
  
  return (
    <div>
        <div className = "wrapper">
            <div className = "ticket">
                <div className = "titulo">
                Ticket transaccion N°
                </div>
                
                <div className = "datos_orden">
                <div className = "id_consumo">
                Consumo: 1230
                </div>
                <div className = "fecha">
                Fecha: 30/07/2021 14:30
                </div>
                </div>
                <div className = "cuenta">
                
                </div>
                <div className = "despedida">
                MUCHAS GRACIAS POR SU COMPRA
                </div>
            </div>
        </div>
    </div>
  );
}