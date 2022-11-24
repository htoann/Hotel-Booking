import {useAppSelector} from '../../store/hooks'

interface Props {
    type: any;
    setType: (arg: any) => void;
}

const Types = ({type, setType}: Props) => {
    const {hotels} = useAppSelector((state) => state.persistedReducer.hotel)
    const types = hotels?.map((hotel) => (
        hotel.type
    ))
        .filter((value, index, self) => self.indexOf(value) === index)

    return (
        <div className="w-full flex flex-wrap justify-center sm:justify-start gap-x-2">
            <button
                className={`w-max px-5 py-2.5 flex items-center justify-start border rounded-3xl  ${
                    type === 'all'
                        ? 'text-secondary border-current bg-gray-100 hover:bg-gray-100'
                        : ' text-primary border-transparent hover:bg-gray-200'
                }
              `}
                onClick={() => setType('all')}
            >
                All
            </button>
            {types?.map((item) => (
                <button
                    key={item}
                    className={`w-max px-5 py-2.5 flex items-center justify-start gap-x-2 border rounded-3xl  ${
                        type === item
                            ? 'text-secondary border-current bg-gray-100 hover:bg-gray-100'
                            : ' text-primary border-transparent hover:bg-gray-200'
                    } 
                 `}
                    onClick={() => setType(item)}
                >
                    <p className="first-letter:uppercase">{item}</p>
                </button>
            ))}
        </div>

    )
}

export default Types
