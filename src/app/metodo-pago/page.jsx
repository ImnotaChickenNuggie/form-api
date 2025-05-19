"use client"
import React, { useState } from 'react'
import { Input } from "baseui/input";
import { PaymentCard } from "baseui/payment-card";
import { DatePickerWrapper } from '@/components/metodo-pago/DatePickerWrapper';

const page = () => {
    const [value, setValue] = useState("");
    const [date, setDate] = useState(new Date());
    const [cardName, setCardName] = useState("");
    const [securityCode, setSecurityCode] = useState("");

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className='flex flex-col p-4 max-w-4xl mx-auto'>
            <h2 className='text-2xl font-semibold mb-6'>Ingresa tus datos de pago</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col space-y-2'>
                    <span className='text-sm font-medium'>Nombre de la tarjeta</span>
                    <Input
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        placeholder="Mario Rosas"
                        clearOnEscape
                    />
                </div>
                <div className='flex flex-col space-y-2'>
                    <span className='text-sm font-medium'>Número de tu tarjeta</span>
                    <PaymentCard
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        clearOnEscape
                        placeholder="Ingresa el número de tu tarjeta"
                    />
                </div>

                <div className='flex flex-col space-y-2'>
                    <span className='text-sm font-medium'>Código de Seguridad</span>
                    <Input
                        value={securityCode}
                        onChange={e => setSecurityCode(e.target.value)}
                        placeholder="CVV"
                        type="password"
                        clearOnEscape
                    />
                </div>
                <div className='flex flex-col space-y-2'>
                    <span className='text-sm font-medium'>Fecha de vencimiento</span>
                    <DatePickerWrapper
                        value={date}
                        onChange={handleDateChange}
                    />
                </div>

                <button>Finalizar Compra</button>
            </div>
        </div>
    )
}

export default page