import React, {useState} from 'react';
import Types from "./Types";
import Locations from "./Locations";

const TripType = () => {
    const [type, setType] = useState({
        name: 'All',
        _id: 'all',

    });
    return (
        <div className="flex flex-col gap-y-5">
            <div>
                <h1 className="font-bold text-2xl text-black">Quick and easy trip planner</h1>
                <h2 className="text-primary font-light text-xl">Pick a vibe and explore the top destinations in
                    Vietnam</h2>
            </div>
            <Types type={type} setType={setType}/>
            <Locations type={type}/>
        </div>
    );
};

export default TripType;