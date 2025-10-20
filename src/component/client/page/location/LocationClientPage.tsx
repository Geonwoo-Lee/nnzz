'use client'

import {Controller, useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";

import Input from "../../common/input/Input"
import Button from "../../common/button/Button";

import Location from '../../../../../public/svg/items/common/Location.svg'
import Search from '../../../../../public/svg/items/common/Search.svg'
import {searchAddressByKeyword} from "@/src/func/common/geo.utils";
import {CurrentLocation, locationSearch} from "@/src/types/page/location/location";
import {useFunnel} from "@/src/hooks/useFunnel";
import LocationComponent from "@/src/component/client/page/location/features/LocationComponent";
import useLocationBasedNavigation from "@/src/hooks/useLocationBasedNavigation";
import {MapPlace} from "@/src/component/client/common/map/NaverMap";
import {useRouter} from "next/navigation";
import Loading from "@/src/component/client/common/loading/Loading";
import SaveApi from "@/src/app/api/client/save/save";

const LocationClientPage = () => {
    const router = useRouter()
    const {control, handleSubmit} = useForm<locationSearch>({
        defaultValues: {
            address: "",
        }
    });
    const locationHandler = useLocationBasedNavigation();
    const { handleLocationRequest, isLoading } = locationHandler;
    const [currentLocation, setCurrentLocation] = useState<CurrentLocation[]>([]);
    const [searchList, setSearchList] = useState<CurrentLocation[]>([]);
    const [Funnel, setFunnel] = useFunnel(['tip', 'current', 'list', 'notFound'], "tip");

    const onSubmit = handleSubmit((data:locationSearch) => {
        searchAddressByKeyword(data.address).then((results) => {
            if (results.length > 0) {
                const newPlaces = results.map(result => ({
                    buildingName: result.name,
                    address: result.address,
                    roadAddress: result.roadAddress,
                    lng: result.longitude,
                    lat: result.latitude
                }));
                setSearchList(() => [ ...newPlaces]);
            } else {
                setFunnel('notFound')
            }
        });
    });

    const setLocation = (place: CurrentLocation) => {
        const pinnedLocation: MapPlace = {
            name: place.buildingName,
            lat: place.lat,
            lng: place.lng,
            address: place.address
        }
        SaveApi.SaveLocation({
            name: pinnedLocation.name,
            address: pinnedLocation.address!,
            latitude: pinnedLocation.lat,
            longitude: pinnedLocation.lng
        }).then(() => {
                window.localStorage.setItem('pinedLocation', JSON.stringify(pinnedLocation));
                router.push('/home')
        }).catch(() => {
            router.push(`/not-service/${encodeURIComponent(pinnedLocation.address!.replace(/\s+/g, ''))}/${pinnedLocation.lat}/${pinnedLocation.lng}`)
        })
    }

    useEffect(() => {
        SaveApi.GetSavedLocation().then((res) => {
            if(res.length > 0) {
                setFunnel('current')
            }
            setCurrentLocation(res)
        })
    }, []);

    useEffect(() => {
        if(searchList.length > 0) {
            setFunnel('list')
        }else {
            const getLocation = JSON.parse(window.localStorage.getItem('currentLocation') || '[]');
            if(getLocation.length > 0) {
                setFunnel('current')
            }else {
                setFunnel('tip')
            }
        }
    }, [searchList]);



    return <div className='  overflow-y-scroll h-basic-body-with-header'>
        <div className='flex flex-col  py-6'>
            <div className='flex flex-col gap-7 px-4 pb-6 sticky top-0 bg-common-white'>
                <div className='whitespace-pre-wrap text-title1 font-bold text-text-1-'>
                    현재 계신 곳의 위치를<br/>
                    검색해주세요
                </div>
                <Controller
                    name="address"
                    control={control}
                    render={({field}) => (
                        <Input
                            {...field}
                            autoFocus
                            style="w-full"
                            placeHolder="도로명으로 검색"
                            left={<Search/>}
                            onSubmit={onSubmit}
                        />
                    )}
                />
                <Button type='outlined' size='lg' style='w-full' onClick={handleLocationRequest}>
                    <div className='flex flex-row gap-1'>
                        <Location/>
                        현재 위치로 찾기
                    </div>
                </Button>
            </div>
                <Funnel>
                    <Funnel.Step name='tip'>
                        <LocationComponent.SearchTip/>
                    </Funnel.Step>
                    <Funnel.Step name='current'>
                        <LocationComponent.CurrentLocation setLocation={setLocation}  place={currentLocation} />
                    </Funnel.Step>
                    <Funnel.Step name='list'>
                        <LocationComponent.SearchList setLocation={setLocation} places={searchList} />
                    </Funnel.Step>
                    <Funnel.Step name='notFound'>
                        <LocationComponent.NoSearch />
                    </Funnel.Step>
                </Funnel>
        </div>
        {isLoading && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <Loading/>
            </div>
        )}
    </div>
}

export default LocationClientPage