import { useEUA } from "../hooks/useEUA";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

function TableTr({ name, quantity, price, total, id }) {
  const { removeToTable, upadteQuantity } = useEUA();

//   const intervalRefs = useRef({ plus: null, less: null });

//   const handleMouseUp = (operation) => {
//     clearInterval(intervalRefs.current[operation]);
//   };
//   const handleInterval = (operation) => {
//     intervalRefs.current[operation] = setInterval(() => {
//       upadteQuantity(id, operation);
//     }, 200);
//   };

const handlerClickRemove = () => {
    removeToTable(id);
  };

  return (
    <tr className='EUA__table__body--tr'>
      <td>{name}</td>
      <td>
        <div className="td__btn__box">
          <button
            className="tr__btn--plus"
            onClick={() => upadteQuantity(id, "plus")}
          >
            <FaPlusCircle />
          </button>
          {quantity}
          <button
            className="tr__btn--less"
            onClick={() => upadteQuantity(id, "less")}
          >
            <FaMinusCircle />
          </button>
        </div>
      </td>
      <td>{price}</td>
      <td>{total}</td>
      <td className='table__body__td--btn'>
        <button onClick={handlerClickRemove}>Eliminar</button>
      </td>
    </tr>
  );
}

export default TableTr;
