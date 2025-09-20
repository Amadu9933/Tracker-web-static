export default function MessageBox ({message, showMessage, state, size='0.8rem', marginX='5rem'}: {message: string, size: string, marginX: string, showMessage: boolean, state: "primary" | "secondary" | "warning" | "success"}) {
    const styles = {
        primary: "border-[#3b82f6] bg-[#3b82f6]/20 text-[#3b82f6]",
        secondary: "border-[#6b7280] bg-[#6b7280]/20 text-[#374151]",
        warning: "border-[#ff833c] bg-[#ff833c]/20 text-[#ff833c]",
        success: "border-[#16a34a] bg-[#16a34a]/20 text-[#16a34a]",
    }

    let boxStyle = "";
    


    switch(state) {
        case "primary": boxStyle = styles.primary; break;
        case "secondary": boxStyle = styles.secondary; break;
        case "warning": boxStyle = styles.warning; break;
        case "success": boxStyle = styles.success; break;
        default: boxStyle = styles.primary; break;
    }
    return (
        <div className={`w-full flex justify-end transition-opacity duration-500 ${ showMessage ? "opacity-100" :"opacity-0"}`} style={{display: "flex"}}>
            <div className={`w-1/2 flex justify-center p-1 mr-[${marginX}] border rounded items-center h-[2rem] w-[13rem] my-4 ${boxStyle} rounded shadow-md`} >
                <p className={`text-[${size}]`}>{message}</p>
            </div> 
        </div> 
    )
}