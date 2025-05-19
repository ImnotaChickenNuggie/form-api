"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Input } from "baseui/input";
import { PhoneInput, COUNTRIES } from "baseui/phone-input";
import { Select } from "baseui/select";
import { useDispatch, useSelector } from 'react-redux';
import { setPersonalData, setErrors, clearErrors } from '@/redux/slices/personalDataSlice';

const page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const personalData = useSelector((state) => state.personalData);
    const [country, setCountry] = useState(COUNTRIES.MX);

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!personalData.firstName?.trim()) {
            errors.firstName = 'Requerimos tu nombre';
            isValid = false;
        }

        if (!personalData.lastName?.trim()) {
            errors.lastName = 'Requerimos al menos un apellido';
            isValid = false;
        }

        if (!personalData.email?.trim()) {
            errors.email = 'El email es requerido';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(personalData.email)) {
            errors.email = 'El email no es válido';
            isValid = false;
        }

        if (!personalData.phone?.trim()) {
            errors.phone = 'El teléfono es requerido';
            isValid = false;
        }

        dispatch(setErrors(errors));
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            router.push('/metodo-pago');
        }
    };

    const handleInputChange = (field, value) => {
        dispatch(setPersonalData({ [field]: value }));
        if (personalData.errors[field]) {
            dispatch(setErrors({ [field]: '' }));
        }
    };

    return (
        <div className='flex flex-col p-8 md:p-10'>
            <h3 className='text-2xl text-start font-medium'>Antes de finalizar tu compra, ingresa los siguientes datos.</h3>
            <span className='mt-1 text-lg'>Estos datos son requeridos para poder envíar tu pedido</span>

            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 md:gap-12 my-10'>
                <div className='flex flex-col'>
                    <span>Nombre(s)</span>
                    <Input
                        value={personalData.firstName || ''}
                        onChange={e => handleInputChange('firstName', e.target.value)}
                        placeholder="Mario Alberto"
                        clearOnEscape
                        error={!!personalData.errors.firstName}
                    />
                    {personalData.errors.firstName && (
                        <span className="text-red-500 text-sm mt-1">{personalData.errors.firstName}</span>
                    )}
                </div>
                <div className='flex flex-col'>
                    <span>Apellidos</span>
                    <Input
                        value={personalData.lastName || ''}
                        onChange={e => handleInputChange('lastName', e.target.value)}
                        placeholder="Rosas González"
                        clearOnEscape
                        error={!!personalData.errors.lastName}
                    />
                    {personalData.errors.lastName && (
                        <span className="text-red-500 text-sm mt-1">{personalData.errors.lastName}</span>
                    )}
                </div>

                <div className='flex flex-col col-span-2 md:col-span-1'>
                    <span>E-mail</span>
                    <Input
                        value={personalData.email || ''}
                        onChange={e => handleInputChange('email', e.target.value)}
                        placeholder="mario@mail.com"
                        clearOnEscape
                        error={!!personalData.errors.email}
                    />
                    {personalData.errors.email && (
                        <span className="text-red-500 text-sm mt-1">{personalData.errors.email}</span>
                    )}
                </div>
                <div className='flex flex-col col-span-2 md:col-span-1'>
                    <span>Número telefónico</span>
                    <PhoneInput
                        country={country}
                        onCountryChange={({ option }) => setCountry(option)}
                        text={personalData.phone || ''}
                        onTextChange={e => handleInputChange('phone', e.currentTarget.value)}
                        error={!!personalData.errors.phone}
                    />
                    {personalData.errors.phone && (
                        <span className="text-red-500 text-sm mt-1">{personalData.errors.phone}</span>
                    )}
                </div>

                <div className='flex flex-col'>
                    <span>Código Postal</span>
                    <Input
                        value={personalData.postalCode || ''}
                        onChange={e => handleInputChange('postalCode', e.target.value)}
                        placeholder="12345"
                        clearOnEscape
                    />
                </div>
                <div className='flex flex-col'>
                    <span>Estado</span>
                    <Select
                        options={[
                            { label: "Ciudad de México", id: "CDMX" },
                            { label: "Toluca", id: "Toluca" },
                            { label: "Pachuca", id: "Pachuca" },
                            { label: "Puebla", id: "Puebla" },
                            { label: "Monterrey", id: "Monterrey" },
                            { label: "Jalisco", id: "Jalisco" },
                        ]}
                        value={personalData.state || null}
                        placeholder="Selecciona un estado"
                        onChange={params => handleInputChange('state', params.value)}
                    />
                </div>
                <button 
                    type="submit"
                    className='bg-blue-600 mt-2 md:mt-0 text-white p-4 rounded-lg mx-auto col-span-2 w-64 text-center hover:bg-blue-700 transition duration-300'
                >
                    Continuar
                </button>
            </form>
        </div>
    )
}

export default page