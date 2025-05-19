"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Select } from "baseui/select";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import Avatar from '../../../public/avatar.png'

const page = () => {
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState([
        {
            label: "Jewelery",
            id: "jewelery"
        },
    ]);
    return (
        <div className='flex flex-col p-8'>
            <Image src={Avatar} alt='Avatar' className='rounded-full w-32 h-32 mx-auto mt-10' />
            <h2 className='text-3xl font-semibold text-center mt-4'>Mario Alberto Rosas González</h2>

            <div className='flex flex-col p-4'>
                <span className='text-xl font-medium mb-1'>Selecciona tus categorías favoritas</span>
                <Select
                    options={[
                        {
                            label: "Men's clothing",
                            id: "menClothing"
                        },
                        {
                            label: "Jewelery",
                            id: "jewelery"
                        },
                        {
                            label: "Electronics",
                            id: "electronics"
                        },
                        {
                            label: "Women's clothing",
                            id: "womenClothing"
                        },
                    ]}
                    value={value}
                    multi
                    placeholder="Selecciona tus categorías"
                    onChange={params => setValue(params.value)}
                />
                <div className='mt-2'>
                    <Checkbox
                        checked={checked}
                        onChange={e => setChecked(e.target.checked)}
                        labelPlacement={LABEL_PLACEMENT.right}
                    >
                        Quiero recibir ofertas y promociones de estas categorías
                    </Checkbox>
                </div>
            </div>
        </div>
    )
}

export default page