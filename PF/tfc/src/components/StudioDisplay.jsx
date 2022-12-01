import * as React from "react";

const StudioDisplay = (props) => {
    const {
        name,
        address,
        images,
    } = props;
    return (
        <div>
            <image src={images[0]} />
            <h1>{name}</h1>
            <h2>{address}</h2>
        </div>
    )
}