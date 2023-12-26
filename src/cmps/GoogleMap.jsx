import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Button, ButtonGroup } from '@mui/material'

const Marker = ({ text = '🧸', ...props }) => (
    <div
        style={{
            width: '50px',
            height: '50px',
            fontSize: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'green',
            borderRadius: '50%',
        }}
    >
        {text}
    </div>
)

export function GoogleMap() {
    const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 9

    function handleClick({ lat, lng }) {
        setCenter({ lat, lng })
    }

    const locations = [
        { name: 'Tel Aviv', lat: 32.0853, lng: 34.7818 },
        { name: 'Jerusalem', lat: 31.7683, lng: 35.2137 },
        { name: 'Eilat', lat: 29.5581, lng: 34.9482 },
        { name: 'Ashdod', lat: 31.7952, lng: 34.6487 },
        { name: 'Beer Sheva', lat: 31.2525, lng: 34.7915 },
    ]

    return (
        <>
            <ButtonGroup color="secondary" variant="outlined" aria-label="outlined primary button group">
                {locations.map((location) => (
                    <Button key={location.name} onClick={() => setCenter({ lat: location.lat, lng: location.lng })}>
                        {location.name}
                    </Button>
                ))}
            </ButtonGroup>


            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDvEjrkfwxyYzO_oLBy1g5lr-H0b2PCces" }}
                    center={center}
                    defaultZoom={zoom}
                    onClick={handleClick}
                >

                    {locations.map((location) => (
                        <Marker key={location.name} lat={location.lat} lng={location.lng} />
                    ))}

                </GoogleMapReact>
            </div>
        </>
    )
}