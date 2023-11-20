import React, {useState} from "react";
import InsurancePDF from "../../../../public/insurance.pdf";


export const Insurance = () => {
    return (

      <div className="container">
         <iframe src={InsurancePDF}  style={{width: "100%", height: "900px"}} className="mb-3"/>
        <div className="card text-center mb-3 w: 25rem">
          <div className="card-body">
            <h5 className="card-title">Pet insurance</h5>
            <a href={InsurancePDF} download="Insurance.pdf" className="btn btn-success">Download file</a>
          </div>
        </div>
        </div>
    )

}
