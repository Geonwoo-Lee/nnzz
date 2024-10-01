'use client'

import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { searchAddressToCoords } from "@/src/app/func/common/geo.utills";
import NaverMap from "@/src/app/component/client/map/NaverMap";

interface FormData {
    address: string;
}

interface Place {
    name: string;
    lat: number;
    lng: number;
}

const TestPage = () => {
    const [places, setPlaces] = useState<Place[]>([]);
    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            address: "",
        }
    });

    const onSubmit = handleSubmit((data: FormData) => {
        searchAddressToCoords(data.address).then((result) => {
            if (result?.latitude && result?.longitude && result?.fullAddress) {
                setPlaces(prevPlaces => [
                    ...prevPlaces,
                    {
                        name: result.fullAddress,
                        lat: result.latitude,
                        lng: result.longitude
                    }
                ]);
            } else {
                alert('위치정보를 찾을 수 없습니다');
            }
        });
    });

    return (
        <div className='flex flex-col pt-20'>
            <form onSubmit={onSubmit}>
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            autoFocus
                            className="w-full text-black"
                            placeholder="주소를 입력하세요"
                        />
                    )}
                />
                <button type="submit">검색</button>
            </form>

            <button onClick={() => setPlaces([])} className="mt-4 mb-4 bg-red-500 text-white p-2 rounded">
                지도 초기화
            </button>

            {places.length > 0 && (
                <div className="mt-4">
                    <NaverMap places={places} />
                </div>
            )}

            <ul className="mt-4">
                {places.map((place, index) => (
                    <li key={index}>{place.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TestPage;