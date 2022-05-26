import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { bookingSelector, userSelector } from '../../../redux/selector'
import { useSelector } from 'react-redux';
import TicketApi from './../../../api/ticketApi';
import emailApi from './../../../api/emailApi';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const PayPal = ({ purcharses, ticket, movieInfo }) => {
    const paypal = useRef()
    const CURRENT_BOOKING = useSelector(bookingSelector)
    const currentUser = useSelector(userSelector)
    const [paidSuccessfully, setPaidSuccessfully] = useState(false)
    const [ratesData, setRatesData] = useState({})

    const navigate = useNavigate()

    // useEffect(() => {
    //     const getRates = async() => {
    //         await fetch('https://tygia.com/json.php?ran=0&gold=0&bank=VIETCOM&date=now')
    //             .then(res => res.json)
    //             .then(data => setRatesData(data))
    //     }

    //     getRates()
    // }, [])

    // const convertMoney = () => {
    //     const input = parseFloat(CURRENT_BOOKING.selectedTheater.price * CURRENT_BOOKING.selectedSeats.length);
    //     if (Number.isNaN(input)) {
    //         return '';
    //     }
    //     const currency = ratesData.rates[0].value.find(item => item.code === 'USD');
    //     if (!currency) {
    //         return '';
    //     }
    //     const sell = parseFloat(currency.sell.replace(',', ''));
    //     const output = input / sell;
    //     const rounded = Math.round(output * 1000) / 1000;
    //     return rounded
    // }

    // const [total, setTotal] = useState(0)
    // useEffect(() => {
    //     let tmp = convertMoney()
    //     setTotal(tmp)
    // },[])


    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [{
                        amount: {
                            currency_code: "USD",
                            value: CURRENT_BOOKING.selectedTheater.price * CURRENT_BOOKING.selectedSeats.length,
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: CURRENT_BOOKING.selectedTheater.price * CURRENT_BOOKING.selectedSeats.length
                                }
                            }
                        },
                        items: purcharses
                    }]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                const tmp = {
                    ...ticket, invoice: {
                        ...ticket.invoice,
                        method: 'paypal'
                    }
                }

                await TicketApi.create(tmp)
                    .then((res) => {

                    })
                    .catch((err) => { console.log(err) })

                emailApi.sendVerify({
                    to: currentUser.email,
                    subject: "Your order information",
                    text: "Thank for buying movie ticket in Shinema site. \n" +
                        "Your order: \n" +
                        `Name: ${currentUser.name} \n` +
                        `Phone: ${currentUser.contact} \n` +
                        // `COD Address: ${bigAddress}` + "\n" +
                        "-------------------------------------------------------- \n" +
                        `Movie: ${movieInfo.title} \n` +
                        `Theater: ${CURRENT_BOOKING.selectedTheater.name + " - Room: " + CURRENT_BOOKING.selectedRoom} \n` +
                        `Seats: ${data.seatIdArray} \n` +
                        "-------------------------------------------------------- \n" +
                        `Total: ${data.total} USD` + "\n" +
                        `Method: Paypal` + "\n" +
                        "-------------------------------------------------------- \n" +
                        "Any wondered things. Please contact with our shop with contact below site: shinema.com"
                }).then(data => {
                    setPaidSuccessfully(true)
                })
                    .catch(err => console.log(err))
            },

            onError: (error) => {
                console.log(error)
            }
        }).render(paypal.current)
    }, [])

    const handleCloseDialog = async () => {
            setPaidSuccessfully(false)
            navigate('/')
        }

    return (
        <div >
            <div ref={paypal}></div>
            <Dialog open={paidSuccessfully}>
                <DialogTitle color='success'>Paid Successfully. Click OK to back to Main Page</DialogTitle>
                <Button
                    onClick={handleCloseDialog}
                    style={{
                        alignSelf: 'center',
                        width: '30px',
                        height: '30px',
                        borderRadius: '15px',
                        border: '1px solid #18608a',
                        backgroundColor: 'green',
                        color: 'black',
                        fontSize: '13px',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        padding: '12px 45px',
                    }}
                >
                    OK
                </Button>
            </Dialog> 
        </div>
    )
}

export default PayPal