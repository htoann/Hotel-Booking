import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {FiTrash} from '../../utils/icons'
import {toast} from 'react-toastify'
import {useDeleteImageMutation, useUploadImagesMutation} from '../../services/uploadApi'
import CubeLoader from '../layout/CubeLoader'

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000

type ImagesData = {
    photos: string[]
}
export type ImagesFormProps = ImagesData & {
    updateFields: (fields: Partial<ImagesData>) => void
}

const ImagesForm = (
    {
        photos,
        updateFields
    }: ImagesFormProps
) => {
    const [files, setFiles] = useState<string[]>(photos)
    const [counter, setCounter] = useState(0)
    const [uploadImages] = useUploadImagesMutation()
    const [deleteImage] = useDeleteImageMutation()
    const handleNewFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files: newFiles} = e.target
        if (newFiles) {
            try {
                let formData = new FormData()
                for (let i = 0; i < newFiles.length; ++i) {
                    const file = newFiles[i]
                    if (file.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
                        formData.append('photos', file)
                    } else {
                        toast.error(`${file.name} size too large`)
                    }
                }
                if (Array.from(formData.keys()).length > 0) {
                    setCounter(Array.from(formData.keys()).length)
                    const url = await uploadImageToCloud(formData)
                    if (url) {
                        setFiles([...files, ...url])
                        setCounter(0)
                    }
                }
            } catch (e) {
                toast.error('Something went wrong')
            }
        }
    }
    const uploadImageToCloud = async (formData: FormData) => {
        try {
            const {url} = await uploadImages(formData).unwrap()
            return url
        } catch (e) {
            console.log(e)
            toast.error(`Upload fail`)
        }
    }
    const removeFile = async (file: string) => {
        try {
            const newFiles = files.filter((e) => e !== file)
            setFiles(newFiles)
            await deleteImage({url: file}).unwrap()
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        updateFields({
            photos: files
        })
    }, [files])
    return (
        <main className="container mx-auto max-w-screen-lg h-full">
            <div
                className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
            >
                <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
                    <label htmlFor="hidden-input"
                        className=" relative border-dashed border-2 border-gray-400 py-16 flex flex-col justify-center items-center">
                        <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                            <span className="w-3/4 text-center">Drag and drop your files anywhere or</span>
                        </p>
                        <input id="hidden-input"
                            type="file"
                            title=""
                            value=""
                            onChange={handleNewFileUpload}
                            accept=".jpg,.png,.jpeg"
                            multiple
                            className="opacity-0 w-full h-full absolute "/>
                        <label htmlFor="hidden-input"
                            className="z-20 mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none text-center">
                            Upload a file
                        </label>
                        <div id="overlay"
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 pointer-events-none z-50 rounded-md flex flex-col items-center mt-3">
                            <i>
                                <svg className="fill-current w-12 h-12 mb-3 text-blue-700"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z"/>
                                </svg>
                            </i>
                            <p className="text-lg text-blue-700 text-center">Drop files to upload</p>
                        </div>
                    </label>
                    <h1 className="pt-16 sm:pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                        To Upload
                    </h1>
                    <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                        {
                            files.length === 0 && counter === 0
                                ? <li id="empty"
                                    className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                                    <img className="mx-auto w-32"
                                        src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                        alt="no data"/>
                                    <span className="text-small text-gray-500">No files selected</span>
                                </li>
                                : <section className="w-full grid grid-cols-2 lg:grid-cols-3 gap-5">
                                    {files.map((file, index) => (
                                        <div key={`${file}`} className="w-full h-50 relative border">
                                            <Image
                                                className="w-full h-auto object-fill"
                                                src={file}
                                                alt={`file preview ${file}`}
                                                width={260}
                                                height={300}
                                            />
                                            <div
                                                className={`absolute top-0 right-0 translate-x-1/2 -translate-y-1/2
                                                                bg-white border rounded-full p-1 text-red-500
                                                                cursor-pointer hover:bg-red-500 hover:text-white
                                                                `}
                                                onClick={() => removeFile(file)}
                                            >
                                                <FiTrash/>
                                            </div>
                                        </div>
                                    ))}
                                    {[...Array(counter)].map((_, index) => (
                                        <div key={index} className="w-full h-40 relative border">
                                            <div className="w-full h-full flex justify-center items-center">
                                                <CubeLoader/>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                        }
                    </ul>
                </section>
            </div>
        </main>

    )
}

export default ImagesForm
