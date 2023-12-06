import React, { useState, useRef, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const axios = require("axios")
const base64 = require('base-64');

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function PayPal(props) {
  const base = "https://api-m.sandbox.paypal.com";
  const payPalToken = useRef('')
  const recurring = props.recurring
  const typeOfSchedule = props.typeOfSchedule
  let initialOptions = {}
  const orderData = useRef({})
  const data = useRef({})
  if (!recurring) {
    initialOptions = {
      "client-id": process.env.PAYPAL_CLIENT_ID,
      "enable-funding": "paylater,venmo,card",
      "disable-funding": "",
      "data-sdk-integration-source": "integrationbuilder_sc",
    };
  } else {
    initialOptions = {
      "client-id": "test",
      "enable-funding": "paylater,card",
      "disable-funding": "",
      "data-sdk-integration-source": "integrationbuilder_sc",
      vault: "true",
      intent: "subscription",
    };
  }
  const [message, setMessage] = useState("");
  const prodId = typeOfSchedule === 'dog-walk' ? "PROD-6X908310GG7759818" : typeOfSchedule === 'pet-check-in' ? 'PROD-9UR7609145820762V' : 'PROD-5D1599235M7091343'
  const numDogs = props.numDogs

  const getPayPalToken = async () => {
    try {
      const client_id = process.env.PAYPAL_CLIENT_ID
      const client_secret = process.env.PAYPAL_CLIENT_SECRET

      const response = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token',
        new URLSearchParams({
          'grant_type': 'client_credentials'
        }),
        {
          headers:
          {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + base64.encode(client_id + ":" + client_secret)
          }
        })
      return response

    } catch (error) {
      console.log('Failed to generate access token: ', error);
      return ''
    }
  }

  useEffect(() => {
    getPayPalToken().then(res => {
      payPalToken.current = res.data.access_token
    })
  }, [])

  const handleResponse = async (response) => {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  };

  const createOrder = async (cart) => {
    // use the cart information passed from the front-end to calculate the purchase unit details
    console.log('Cart :', cart);
    const accessToken = payPalToken.current
    console.log(accessToken)
    const url = `${base}/v2/checkout/orders`;
    const value = typeOfSchedule === 'dog-walk' ? '20.00' : typeOfSchedule === 'pet-check-in' ? '16.00' : typeOfSchedule === 'meeting' ? '0.00' : String(numDays * 50) + '.00'
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: value
          },
        },
      ],
    };

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    return handleResponse(response);
  };

  const captureOrder = async (orderID) => {
    const accessToken = payPalToken.current
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
    });

    return handleResponse(response);
  };

  const createSubscription = async (userAction = "SUBSCRIBE_NOW") => {
    const PLAN_ID = typeOfSchedule === 'dog-walk' ? 'P-8GF629424H358540PMVX4OAY' : 'P-65J83330LA251922NMVX4P5I'
    console.log(PLAN_ID)
    const url = `${base}/v1/billing/subscriptions`;
    const accessToken = payPalToken.current
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        'plan_id': PLAN_ID,
        'quantity': numDogs,
        'application_context': {
          'user_action': userAction,
        },
      }),
    });

    return handleResponse(response);
  };

  if (!recurring) {
    return (
      <div className="App">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{
              shape: "pill",
              layout: "vertical",
            }}
            createOrder={async () => {
              try {

                const cart = JSON.stringify({
                  cart: [
                    {
                      id: prodId,
                      quantity: numDogs,
                    },
                  ],
                })

                try {
                  // use the cart information passed from the front-end to calculate the order amount detals
                  orderData.current = await createOrder(cart);
                  console.log(orderData.current.jsonResponse)
                } catch (error) {
                  console.error("Failed to create order:", error);
                }
                if (orderData.current.jsonResponse.id) {
                  return orderData.current.jsonResponse.id;
                } else {
                  const errorDetail = orderData?.current.jsonResponse.details?.[0];
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData.current.jsonResponse);

                  throw new Error(errorMessage);
                }
              } catch (error) {
                console.error(error);
                setMessage(`Could not initiate PayPal Checkout...${error}`);
              }
            }}
            onApprove={async (data, actions) => {
              try {
                try {
                  const orderID = data.orderID;
                  orderData.current = await captureOrder(orderID);
                } catch (error) {
                  console.error("Failed to create order:", error);
                }
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you message

                const errorDetail = orderData?.current.jsonResponse.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                  return actions.restart();
                } else if (errorDetail) {
                  // (2) Other non-recoverable errors -> Show a failure message
                  setMessage(`Payment failed. Error: ${errorDetail.description}`)
                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`,
                  );
                } else {
                  // (3) Successful transaction -> Show confirmation or thank you message
                  // Or go to another URL:  actions.redirect('thank_you.html');
                  const transaction = orderData.current.jsonResponse.purchase_units[0].payments.captures[0];
                  setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
                  );
                  console.log(
                    "Capture result",
                    orderData,
                    JSON.stringify(orderData, null, 2),
                  );
                }
              } catch (error) {
                console.error(error);
                setMessage(
                  `Sorry, your transaction could not be processed...${error}`,
                );
              }
            }}
          />
        </PayPalScriptProvider>
        <Message content={message} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{
              shape: "pill",
              layout: "vertical",
            }}
            createSubscription={async () => {
              try {
                try {
                  data.current = { jsonResponse, httpStatusCode } = await createSubscription();
                } catch (error) {
                  console.error("Failed to create order:", error);
                }
                if (data?.current.jsonResponse.id) {
                  setMessage(`Successful subscription...`);
                  return data.id;
                } else {
                  console.error(
                    { callback: "createSubscription", serverResponse: data },
                    JSON.stringify(data, null, 2),
                  );
                  // (Optional) The following hides the button container and shows a message about why checkout can't be initiated
                  const errorDetail = data?.current.jsonResponse.details?.[0];
                  setMessage(
                    `Could not initiate PayPal Subscription...<br><br>${errorDetail?.issue || ""
                    } ${errorDetail?.description || data?.current.jsonResponse.message || ""} ` +
                    (data?.debug_id ? `(${data.current.jsonResponse.debug_id})` : ""),
                    { hideButtons: true },
                  );
                }
              } catch (error) {
                console.error(error);
                setMessage(`Could not initiate PayPal Subscription...${error}`);
              }
            }}
            onApprove={async (data, actions) => {
              /*
                No need to activate manually since SUBSCRIBE_NOW is being used.
                Learn how to handle other user actions from our docs:
                https://developer.paypal.com/docs/api/subscriptions/v1/#subscriptions_create
              */
              if (data.current.jsonResponse.orderID) {
                setMessage(
                  `You have successfully subscribed to the plan. Your subscription id is: ${data.subscriptionID}`,
                );
              } else {
                setMessage(
                  `Failed to activate the subscription: ${data.current.jsonResponse.subscriptionID}`,
                );
              }
            }}
          />
        </PayPalScriptProvider>
        <Message content={message} />
      </div>
    );
  }
}

export default PayPal;