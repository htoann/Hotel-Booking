import React, {FormEvent, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useUpdateHotelMutation} from '../../../services/userApi'
import {Button} from '../../../components/core'
import {toast} from 'react-toastify'
import {useAppSelector} from '../../../store/hooks'
import {IHotel} from '../../../models'
import AddressForm from '../../../components/join/AddressForm'
import {useMultistepForm} from '../../../hooks/useMultiStepForm'
import {HotelInfoForm, ImagesForm, PublishedForm, TypeForm} from '../../../components/join'

const EditPage = () => {
    const router = useRouter()
    const id = router.query?.id as string
    const {myHotels} = useAppSelector((state) => state.persistedReducer.hotel)

    const [data, setData] = useState<IHotel>({
        address: {name: ''},
        city: '',
        desc: '',
        descShort: '',
        distance: '',
        featured: false,
        name: '',
        photos: [],
        published: false,
        title: '',
        type: ''
    })

    useEffect(() => {
        const result = myHotels.find((hotel) => hotel._id === id)
        result && setData(result)
    }, [id, myHotels])

    function updateFields (fields: Partial<IHotel>) {
        setData(prev => {
            return {...prev, ...fields}
        })
    }

    const [updateHotel, {isLoading: isUpdating}] = useUpdateHotelMutation()

    const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} =
        useMultistepForm([
            <TypeForm key={0} {...data} updateFields={updateFields}/>,
            <HotelInfoForm key={1} {...data} updateFields={updateFields}/>,
            <AddressForm key={2} {...data} updateFields={updateFields}/>,
            <ImagesForm key={3} {...data} updateFields={updateFields}/>,
            <PublishedForm key={4} {...data} updateFields={updateFields}/>
        ])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isLastStep) return next()
        try {
            if (data) {
                await updateHotel(data)
                await router.push('/join')
                toast.success('Update success')
            }
        } catch (e) {
            console.log(e)
            toast.error('Something went wrong')
        }
    }
    return (
        <div
            className="mx-auto container px-4 lg:px-6 py-6 relative"
        >
            <form onSubmit={onSubmit}>
                <div
                    className="absolute top-0 right-0"
                >
                    {currentStepIndex + 1} / {steps.length}
                </div>
                {step}
                <div
                    className="mt-2.5 flex justify-end gap-2.5"

                >
                    {!isFirstStep && (
                        <div onClick={back}>
                            <Button text="Back" textColor="text-white" bgColor="bg-primary"/>
                        </div>
                    )}
                    <button
                        type="submit" disabled={isUpdating}>
                        <Button text={isLastStep ? 'Update' : 'Next'} textColor="text-white" bgColor="bg-primary"/>
                    </button>
                </div>
            </form>
        </div>
    )

    // if (data) {
    //     return (
    //         <div className="my-4 mx-auto container px-4 lg:px-6 overflow-hidden flex flex-col">
    //             <div className="w-max">
    //                 <Link href="/join">
    //                     <Button text='Back' bgColor="bg-lightPrimary" textColor="text-white" IcAfter={BiArrowBack}/>
    //                 </Link>
    //             </div>
    //             <div className="mt-5 p-5 flex flex-col gap-y-5 w-full mx-auto border rounded-lg">
    //                 <div className="flex flex-col">
    //                     <label htmlFor="" className="block uppercase text-xs font-bold mb-2">
    //                         Name
    //                         <span className="text-red-500"> *</span>
    //                     </label>
    //                     <input
    //                         className="rounded"
    //                         type="text"
    //                         required
    //                         value={data.name}
    //                         onChange={e => updateFields({name: e.target.value})}
    //                     />
    //                 </div>
    //                 <div className="flex flex-col">
    //                     <label htmlFor="" className="block uppercase text-xs font-bold mb-2">
    //                         Title
    //                         <span className="text-red-500"> *</span>
    //                     </label>
    //                     <input
    //                         className="rounded"
    //                         type="text"
    //                         required
    //                         value={data.title}
    //                         onChange={e => updateFields({title: e.target.value})}
    //
    //                     />
    //                 </div>
    //                 <div className="flex flex-col">
    //                     <label htmlFor=""
    //                         className="block uppercase text-xs font-bold mb-2">
    //                         Description
    //                         <span className="text-red-500"> *</span>
    //                     </label>
    //                     <textarea
    //                         className="rounded"
    //                         rows={4}
    //                         required
    //                         value={data.desc}
    //                         onChange={e => updateFields({desc: e.target.value})}
    //
    //                     />
    //                 </div>
    //                 <div className="flex flex-col">
    //                     <label htmlFor="" className="block uppercase text-xs font-bold mb-2">
    //                         Description short
    //                         <span className="text-red-500"> *</span>
    //                     </label>
    //                     <input
    //                         className="rounded"
    //                         type="text"
    //                         required
    //                         value={data.descShort}
    //                         onChange={e => updateFields({descShort: e.target.value})}
    //
    //                     />
    //                 </div>
    //                 <div className="flex flex-col">
    //                     <label htmlFor="" className="block uppercase text-xs font-bold mb-2">
    //                         City
    //                         <span className="text-red-500"> *</span>
    //                     </label>
    //                     <input
    //                         className="rounded"
    //                         type="text"
    //                         required
    //                         value={data.city}
    //                         onChange={e => updateFields({city: e.target.value})}
    //
    //                     />
    //                 </div>
    //                 <div className="flex flex-col">
    //                     <label htmlFor="" className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
    //                         Distance
    //                         <span className="text-red-500"> *</span>
    //                     </label>
    //                     <input
    //                         className="rounded"
    //                         type="text"
    //                         required
    //                         value={data.distance}
    //                         onChange={e => updateFields({distance: e.target.value})}
    //                     />
    //                 </div>
    //                 <div className="flex items-center gap-5">
    //                     <span>Published</span>
    //                     <div className="relative h-8 w-14 cursor-pointer"
    //                         onClick={() => updateFields({published: !data.published})}
    //                     >
    //                         <input type="radio" className="peer sr-only" checked={data.published}/>
    //                         <span
    //                             className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"
    //                         >
    //                         </span>
    //                         <span
    //                             className="absolute inset-0 m-1 h-6 w-6 rounded-full bg-white transition peer-checked:translate-x-6"
    //                         >
    //                         </span>
    //                     </div>
    //                 </div>
    //
    //             </div>
    //
    //             <AddressForm address={data.address} updateFields={updateFields}/>
    //
    //             <div>
    //                 <span>Photos</span>
    //                 <section className="w-full grid grid-cols-2 lg:grid-cols-3 gap-5">
    //                     {data.photos.map((file) => (
    //                         <div key={`${file}`} className="w-full h-40 relative border">
    //                             <Image
    //                                 className="w-full h-full object-contain"
    //                                 src={file}
    //                                 alt={`file preview ${file}`}
    //                                 width={2000}
    //                                 height={1000}
    //                             />
    //                             <div
    //                                 className={`absolute top-0 right-0 translate-x-1/2 -translate-y-1/2
    //                                                             bg-white border rounded-full p-1 text-red-500
    //                                                             cursor-pointer hover:bg-red-500 hover:text-white
    //                                                             `}
    //                                 // onClick={() => removeFile(file)}
    //                             >
    //                                 <FiTrash/>
    //                             </div>
    //                         </div>
    //                     ))}
    //                     <div className="w-full h-40">
    //                         <label htmlFor="hidden-input"
    //                             className="h-full relative border-dashed border-2 border-gray-400 flex flex-col justify-center items-center">
    //                             <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
    //                                 <span className="w-3/4 text-center">Drag and drop your files anywhere or</span>
    //                             </p>
    //                             <input id="hidden-input"
    //                                 type="file"
    //                                 title=""
    //                                 value=""
    //                                 // onChange={handleNewFileUpload}
    //                                 accept=".jpg,.png,.jpeg"
    //                                 multiple
    //                                 className="opacity-0 w-full h-full absolute "/>
    //                             <label htmlFor="hidden-input"
    //                                 className="z-20 mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none text-center">
    //                                 Upload a file
    //                             </label>
    //                         </label>
    //                     </div>
    //
    //                 </section>
    //
    //             </div>
    //             <div className="mt-2.5 flex justify-around ">
    //                 <button type="button" disabled={isUpdating} onClick={handleUpdate}>
    //                     <Button
    //                         text="Update"
    //                         textColor="text-white"
    //                         bgColor={isUpdating ? 'bg-gray-500' : 'bg-green-500'}
    //                         IcAfter={MdUpdate}
    //                     />
    //                 </button>
    //             </div>
    //         </div>
    //     )
    // }
}

export default EditPage
