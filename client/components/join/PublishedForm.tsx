import React from 'react'

type PublishedData = {
    published: boolean
}
export type PublishedFormProps = PublishedData & {
    updateFields: (fields: Partial<PublishedData>) => void
}
const PublishedForm = ({published, updateFields}: PublishedFormProps) => {
    return (
        <div className="flex items-center gap-5">
            <span>Published</span>
            <div className="relative h-8 w-14 cursor-pointer"
                onClick={() => updateFields({published: !published})}
            >
                <input type="radio" className="peer sr-only" checked={published}/>
                <span
                    className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"
                >
                </span>
                <span
                    className="absolute inset-0 m-1 h-6 w-6 rounded-full bg-white transition peer-checked:translate-x-6"
                >
                </span>
            </div>
        </div>
    )
}

export default PublishedForm
