import React, {useState} from "react";
import InsurancePDF from "../../../../public/insurance.pdf";


export const Insurance = () => {
    return (

      <div className="container">
        <div className="card text-center mb-3 w: 25rem">
          <div className="card-body">
            <h5 className="card-title">Pet insurance</h5>
            <a href={InsurancePDF} download="Insurance.pdf" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        </div>
    )

}