interface Props {
    label?: string;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: () => void;
}

const Input = ({type, label, name, value, onChange, placeholder}: Props) => {
    return (
        <div className="max-w-lg w-full flex items-start justify-center flex-col my-1">
            {label && <label className="text-sm">{label}</label>}
            <input
                className="border-2 w-full rounded-md px-2 py-2"
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Input
