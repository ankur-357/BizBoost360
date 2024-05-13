import { FaTrash } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { useEUA } from "../hooks/useEUA";
import  FullScreenBnt  from './btnFullScreen'

function EUAButton() {
    const {clearTable,generateSale} = useEUA()
    return (
        <section className='EUA__list--button'>
            <button title="Cerrar Todo" className='EUA__list--btn-cerrar'>
                <FaPowerOff />
                Cerrar
            </button>
            <button title="Vaciar Tabla" onClick={()=>clearTable()} className='EUA__list__btn-clear'>
                <FaTrash /> Vaciar 
            </button>
            <FullScreenBnt/>
            
            <button onClick={()=> generateSale()} title="Generar venta " className='EUA__list__btn-generate-sale'>
                <GoTasklist />
                Generar venta 
            </button>
            
            
           

        </section>
    );
}

export default EUAButton;