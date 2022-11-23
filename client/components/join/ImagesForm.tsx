// Wait API upload image

import React, {useState} from 'react'
import {FiTrash} from '../../utils/icons'

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
    const [files, setFiles] = useState<any>({})
    const handleNewFileUpload = (e: any) => {
        const {files: newFiles} = e.target
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles)
            setFiles(updatedFiles)
            // callUpdateFilesCb(updatedFiles)
        }
    }
    const addNewFiles = (newFiles: any) => {
        for (let file of newFiles) {
            if (file.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
                files[file.name] = file
            }
        }
        return {...files}
    }
    const convertNestedObjectToArray = (nestedObj: any) =>
        Object.keys(nestedObj).map((key) => nestedObj[key])

    // const callUpdateFilesCb = (files: any) => {
    //     const filesAsArray = convertNestedObjectToArray(files)
    //     updateFilesCb(filesAsArray)
    // }
    const removeFile = (fileName: any) => {
        delete files[fileName]
        setFiles({...files})
        // callUpdateFilesCb({...files})
    }
    return (
        <>
            <div>
                <div className="sm:px-8 md:px-16 sm:py-8">
                    <main className="container mx-auto max-w-screen-lg h-full">
                        <div
                            className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
                        >
                            <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
                                <label htmlFor="hidden-input"
                                    className=" relative border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                                    <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                                        <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
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
                                        className="z-20 mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                        Upload a file
                                    </label>
                                    <div id="overlay"
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 pointer-events-none z-50 rounded-md flex flex-col items-center">
                                        <i>
                                            <svg className="fill-current w-12 h-12 mb-3 text-blue-700"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z"/>
                                            </svg>
                                        </i>
                                        <p className="text-lg text-blue-700">Drop files to upload</p>
                                    </div>
                                </label>
                                <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                                    To Upload
                                </h1>
                                <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
                                    {
                                        Object.keys(files).length === 0
                                            ? <li id="empty"
                                                className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                                                <img className="mx-auto w-32"
                                                    src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                                                    alt="no data"/>
                                                <span className="text-small text-gray-500">No files selected</span>
                                            </li>
                                            : <section className="flex flex-wrap gap-5 ">
                                                {Object.keys(files).map((fileName, index) => {
                                                    let file = files[fileName]
                                                    let isImageFile = file.type.split('/')[0] === 'image'
                                                    return (
                                                        <div key={fileName} className="relative border">
                                                            {isImageFile && (
                                                                <img className="h-40 object-cover"
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={`file preview ${index}`}
                                                                />
                                                            )}
                                                            <div>
                                                                <div
                                                                    className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2
                                                                bg-white border rounded-full p-1 text-red-500
                                                                cursor-pointer hover:bg-red-500 hover:text-white
                                                                "
                                                                    onClick={() => removeFile(fileName)}
                                                                >
                                                                    <FiTrash/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </section>
                                    }
                                </ul>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default ImagesForm
