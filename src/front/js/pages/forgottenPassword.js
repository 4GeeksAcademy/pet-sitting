import React, { useState } from "react";

export const ForgottenPassword = () => {
    const [email, setEmail] = useState("");
    const [messageStatus, setMessageStatus] = useState("pending")
    const handleResetPassword = async () => {
        console.log(email)
        let options = {
            method: "PUT",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ email: email })
        }
        try {
            let response = await fetch(process.env.BACKEND_URL + "/api/forgotten-password", options)
            let data = await response.json()
            if (data) {
                setMessageStatus("sent")
                console.log(data)
            }
            else{
                console.log(response)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container pt-3"  >
            {messageStatus=="pending"?(
                 <div className="Card mx-auto" style={{ width: "25rem" }}>
                 <h3 className="text-center">Reset your password</h3>
                 <p className="text-center">Enter the email address registered with your account. We'll email you a temporary password, so that you may access your account and change your password.</p>
                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                 <button className="btn btn-outline-primary mt-3 w-100" onClick={handleResetPassword}>Continue</button>
                </div>
            ):(
                <div>Your message has been sent</div>
            )
            }
        </div>
    )


}