import { TbTablePlus } from "react-icons/tb";
import { useEUA } from "../hooks/useEUA";


function EUACard({ name, image, price, category, currency, quantity, id }) {
    const { addToTable } = useEUA()

    const handleClickCard = () => {
        const product = {
            name,
            price,
            quantity: 1,
            id
        }
        addToTable(product)
    }

    return (
        <article className='EUA__product__card'>
            <button className="EUA__product__card--btn" onClick={handleClickCard} title="Add Product"><TbTablePlus /></button>
            <img
                src={image.url}
                alt={`Imagen de ${name}`}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://i.imgur.com/mzWDZMp.png';
                }}
            />
            <ul>
                <li className={quantity < 1 ? "text--red" : ""}>{name}</li>
                <li>{price} <strong>{currency}</strong></li>
                <li>{category}</li>
            </ul>
        </article>
    );
}

export default EUACard;