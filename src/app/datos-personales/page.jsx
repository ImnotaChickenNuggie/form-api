"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { Input } from "baseui/input";
import { PhoneInput, COUNTRIES } from "baseui/phone-input";
import { Select } from "baseui/select";

const page = () => {
    const [value, setValue] = useState("");
    const [country, setCountry] = useState(COUNTRIES.MX);
    const [text, setText] = useState("");
    return (
        <div className='flex flex-col'>
            <h3>Antes de finalizar tu compra, ingresa la información necesaria</h3>
            <span>Estos datos son requeridos para poder envíar tu pedido</span>

            {/* formulario */}
            <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col'>
                    <span>Nombre(s)</span>
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Mario Alberto"
                        clearOnEscape
                    />
                </div>
                <div className='flex flex-col'>
                    <span>Apellidos</span>
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Rosas González"
                        clearOnEscape
                    />
                </div>

                <div className='flex flex-col'>
                    <span>E-mail</span>
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="mario@mail.com"
                        clearOnEscape
                    />
                </div>
                <div className='flex flex-col'>
                    <span>Número telefónico</span>
                    <PhoneInput
                        country={country}
                        onCountryChange={({ option }) => setCountry(option)}
                        text={text}
                        onTextChange={e => setText(e.currentTarget.value)}
                    />
                </div>

                <div className='flex flex-col'>
                    <span>Código Postal</span>
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="12345"
                        clearOnEscape
                    />
                </div>
                <div className='flex flex-col'>
                    <span>Estado</span>
                    <Select
                        options={[
                            {
                                label: "AliceBlue",
                                id: "#F0F8FF"
                            },
                            {
                                label: "AntiqueWhite",
                                id: "#FAEBD7"
                            },
                            {
                                label: "Aqua",
                                id: "#00FFFF"
                            },
                            {
                                label: "Aquamarine",
                                id: "#7FFFD4"
                            },
                            {
                                label: "Azure",
                                id: "#F0FFFF"
                            },
                            {
                                label: "Beige",
                                id: "#F5F5DC"
                            }
                        ]}
                        value={value}
                        placeholder="Select color"
                        onChange={params => setValue(params.value)}
                    />
                </div>

                <Link href='/metodo-pago'>Continuar</Link>


            </div>
        </div>
    )
}

export default page