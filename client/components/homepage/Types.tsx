import {AiOutlineHeart, BsFlower1, MdOutlineDirectionsBike, MdOutlineLocationCity, TbBeach} from '../../utils/icons'

interface Props {
    type: any;
    setType: (arg: any) => void;
}

const Types = ({type, setType}: Props) => {
    const types = [
        {
            _id: '1',
            name: 'Beach',
            icon: <TbBeach/>

        },
        {
            _id: '2',
            name: 'Outdoors',
            icon: <MdOutlineDirectionsBike/>
        },
        {
            _id: '3',
            name: 'City',
            icon: <MdOutlineLocationCity/>
        },
        {
            _id: '4',
            name: 'Romance',
            icon: <AiOutlineHeart/>
        },
        {
            _id: '5',
            name: 'Relax',
            icon: <BsFlower1/>
        }
    ]
    return (
        <div className="lg:col-span-3 xl:col-span-3 w-full">
            <div className="w-full flex gap-x-2">
                <button
                    className={`w-max px-5 py-2.5 flex items-center justify-start border rounded-3xl  ${
                        type._id === 'all'
                            ? 'text-secondary border-current bg-gray-100 hover:bg-gray-100'
                            : ' text-primary border-transparent hover:bg-gray-200'
                    }
              `}
                    onClick={() => setType({
                        name: 'All',
                        _id: 'all'
                    })}
                >
                    All
                </button>
                {types?.map((item) => (
                    <button
                        key={item._id}
                        className={`w-max px-5 py-2.5 flex items-center justify-start gap-x-2 border rounded-3xl  ${
                            type._id === item._id
                                ? 'text-secondary border-current bg-gray-100 hover:bg-gray-100'
                                : ' text-primary border-transparent hover:bg-gray-200'
                        }
              `}
                        onClick={() => setType({...item})}
                    >
                        {item.icon}
                        <p>{item.name}</p>
                    </button>
                ))}
            </div>

        </div>
    )
}

export default Types
