import React from 'react'
import { useEffect, useRef } from 'react';

const PayPal = () => {
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Button({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                        description: "a table",

                        amount: {
                            currentcy_code: "USD",
                            value: 100.00
                        }
                    }]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order)
            },

            onError: (error) => {
                console.log(error)
            }
        }).render(paypal.current)
    }, [])

    return (
        <div >
            <div ref={paypal}></div>
        </div>
    )
}

export default PayPal