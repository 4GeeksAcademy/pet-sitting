import React from "react";

export const ForgottenPassword = () => {

    return (
        <div className="container pt-3"  >
            <div className="Card mx-auto" style={{width:"25rem"}}>
                <h3 class="text-center">Reset your password</h3>
                <p class="text-center">Enter the email address registered with your account. We'll email you a temporary password, so that you may access your account and change your password.</p>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
                <button className="btn btn-outline-primary mt-3 w-100">Continue</button>
            </div>

        </div>
    )

}