"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Input } from "baseui/input";
import { PaymentCard } from "baseui/payment-card";
import { DatePickerWrapper } from '@/components/metodo-pago/DatePickerWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentData, setErrors } from '@/redux/slices/paymentDataSlice';

const page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const paymentData = useSelector((state) => state.paymentData);
    const [date, setDate] = useState(paymentData.expirationDate || new Date());

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!paymentData.cardName?.trim()) {
            errors.cardName = 'El nombre en la tarjeta es requerido';
            isValid = false;
        }

        if (!paymentData.cardNumber?.trim()) {
            errors.cardNumber = 'El número de tarjeta es requerido';
            isValid = false;
        } else if (paymentData.cardNumber.replace(/\s/g, '').length < 16) {
            errors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
            isValid = false;
        }

        if (!paymentData.securityCode?.trim()) {
            errors.securityCode = 'El código de seguridad es requerido';
            isValid = false;
        } else if (paymentData.securityCode.length < 3) {
            errors.securityCode = 'El código de seguridad debe tener 3 dígitos';
            isValid = false;
        }

        if (!date) {
            errors.expirationDate = 'La fecha de vencimiento es requerida';
            isValid = false;
        }

        dispatch(setErrors(errors));
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            router.push('/confirmacion');
        }
    };

    const handleInputChange = (field, value) => {
        dispatch(setPaymentData({ [field]: value }));
        if (paymentData.errors[field]) {
            dispatch(setErrors({ [field]: '' }));
        }
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
        dispatch(setPaymentData({ expirationDate: newDate }));
        if (paymentData.errors.expirationDate) {
            dispatch(setErrors({ expirationDate: '' }));
        }
    };

    return (
        <div className='flex flex-col p-4 max-w-4xl mx-auto'>
            <h2 className='text-2xl font-semibold mb-6'>Ingresa tus datos de pago</h2>

            <form onSubmit={handleSubmit} className='w-full'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-sm font-medium'>Nombre de la tarjeta</span>
                        <Input
                            value={paymentData.cardName || ''}
                            onChange={e => handleInputChange('cardName', e.target.value)}
                            placeholder="Mario Rosas"
                            clearOnEscape
                            error={!!paymentData.errors.cardName}
                        />
                        {paymentData.errors.cardName && (
                            <span className="text-red-500 text-sm mt-1">{paymentData.errors.cardName}</span>
                        )}
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-sm font-medium'>Número de tu tarjeta</span>
                        <PaymentCard
                            value={paymentData.cardNumber || ''}
                            onChange={e => handleInputChange('cardNumber', e.target.value)}
                            clearOnEscape
                            placeholder="Ingresa el número de tu tarjeta"
                            error={!!paymentData.errors.cardNumber}
                        />
                        {paymentData.errors.cardNumber && (
                            <span className="text-red-500 text-sm mt-1">{paymentData.errors.cardNumber}</span>
                        )}
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <span className='text-sm font-medium'>Código de Seguridad</span>
                        <Input
                            value={paymentData.securityCode || ''}
                            onChange={e => handleInputChange('securityCode', e.target.value)}
                            placeholder="CVV"
                            type="password"
                            maxLength={3}
                            clearOnEscape
                            error={!!paymentData.errors.securityCode}
                        />
                        {paymentData.errors.securityCode && (
                            <span className="text-red-500 text-sm mt-1">{paymentData.errors.securityCode}</span>
                        )}
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-sm font-medium'>Fecha de vencimiento</span>
                        <DatePickerWrapper
                            value={date}
                            onChange={handleDateChange}
                            error={!!paymentData.errors.expirationDate}
                        />
                        {paymentData.errors.expirationDate && (
                            <span className="text-red-500 text-sm mt-1">{paymentData.errors.expirationDate}</span>
                        )}
                    </div>
                </div>

                <div className='mt-6 flex justify-center'>
                    <button 
                        type="submit"
                        className='bg-blue-600 text-white p-4 rounded-lg w-64 text-center hover:bg-blue-700 transition duration-300 hover:cursor-pointer'
                    >
                        Finalizar Compra
                    </button>
                </div>
            </form>
        </div>
    )
}

export default page