import React from 'react'

const Information = () => {
    return (
        <div className="flex flex-col gap-y-5">
            <div className="flex flex-col">
                <label htmlFor="">Name</label>
                <input type="text"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Title</label>
                <input type="text"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Description</label>
                <input type="text"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="">Description short</label>
                <input type="text"/>
            </div>
        </div>
    )
}

export default Information
