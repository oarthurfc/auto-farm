const InputField = ({label, placeholder, type}) => {

    return (
        <div className="flex flex-col gap-1">
                <span className="text-emerald-800 font-semibold">{label}</span>
                <input type={type} placeholder={placeholder} className="h-12 border border-[#E3E3E3] rounded-[4px] p-4 font-normal placeholder-[#90A0B7] text-sm text-emerald-950"/>
        </div>
    )
};

export default InputField