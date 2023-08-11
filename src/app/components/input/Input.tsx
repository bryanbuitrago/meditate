'use client'

type InputProps = {
    type: any;
    value: any;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    textarea?: boolean;
    id: string;
    placeholder?: string;
    big?: boolean;
}


function Input({ type, value, onChange, name, textarea, id, placeholder, big }: InputProps) {
    return (
        <input 
            type={type} 
            value={value} 
            onChange={onChange} 
            name={name} 
            id={id} 
            placeholder={placeholder}
         />
    );
}

export default Input;