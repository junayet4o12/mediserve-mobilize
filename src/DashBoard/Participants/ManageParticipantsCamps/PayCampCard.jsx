/* eslint-disable react/prop-types */

// import React from 'react';

import { Modal } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import './PayCamp.css'
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";

const PayCampCard = ({ handleClose, open,camp,  refetch }) => {
    console.log(camp?.campInfo?.campFee);
    const { user } = useAuth()
    const [error, seterror] = useState('');
    const [transitionid, settransitionid] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setclientSecret] = useState('')
    
    
   
    const price = camp?.campInfo?.campFee;
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/completePayment', { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setclientSecret(res.data.clientSecret);
                })
        }

    }, [price])
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error);
            seterror(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            seterror('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('payment Intent', paymentIntent);
            if (paymentIntent.status == 'succeeded') {
                console.log('transition id', paymentIntent?.id);
                settransitionid(paymentIntent?.id);
                const payment = {
                    email: user?.email,
                    price: price,
                    date: new Date(),
                    registeredCampId: camp?._id,
                    registeredCampdetails: {
                        camp
                    },
                    transactionId: paymentIntent?.id
                }
                console.log(camp?.campInfo?.campId);
                 const res =  await axiosSecure.post(`/payments/${camp?._id}`, payment)
                 console.log(res?.data);
                 if(res?.data?.payment?.insertedId && res?.data?.updateCamp?.modifiedCount>0){
                    handleClose()
                    Swal.fire({
                        icon: "success",
                        title: ` $${price} Payment Successfully Completed and your transactionId  is ${paymentIntent?.id}`,
                        showConfirmButton: true,
                      });
                      refetch()
                 }
            }
        }
    }
    const handleClosing = () => {
        handleClose()
        seterror('')
    }
    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >

                <div className="bg-white py-7 px-5 rounded-lg w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%]">
                    <h2 className="font-semibold text-lg pb-3 px-3 text-center">Please  Pay ${price} By Card</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-100 p-3 rounded shadow-md border border-gray-300">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '15px',
                                            color: '#000',


                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div className="flex flex-wrap  items-center gap-y-5 gap-x-7 mt-5 mb-2">
                            <button type="submit" className="btn btn-primary font-bold pay bg-green-400 text-white border-none rounded-sm w-[100px]" disabled={!stripe || !clientSecret}>
                                Pay
                            </button>
                            
                            <p className="btn btn-neutral font-bold bg-red-400 text-white border-none clg  w-[100px]" onClick={handleClosing}>close</p>
                        </div>
                        <p className="text-red-500 text-sm italic font-semibold">{error}</p>
                        {transitionid && <p className="text-green-500  text-sm italic font-semibold">Your transition id: {transitionid}</p>}

                    </form>

                </div>

            </Modal>
        </div>
    );
};

export default PayCampCard;