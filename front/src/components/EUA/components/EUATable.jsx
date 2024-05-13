import TableTr from "./tableTr";
import { useEUA } from "../hooks/useEUA";
function EUATable({headerTableData}) {
    const {productsTable} = useEUA() 
    return (
        <table className='EUA__table'>
                        <thead className='EUA__table__header'>
                            <tr className='EUA__table__header--tr'>
                                <th className='header__tr--th'>{headerTableData.title1}</th>
                                <th className='header__tr--th'>{headerTableData.title2}</th>
                                <th className='header__tr--th'>{headerTableData.title3}</th>
                                <th className='header__tr--th'>{headerTableData.title4}</th>
                                <th className='header__tr--th'>{headerTableData.title5}</th>
                            </tr>
                        </thead>
                        <tbody className='EUA__table__body'>
                        {productsTable.length > 0 && 
                            productsTable.map(item => (
                                <TableTr 
                                key={item.id}
                                name={item.name}
                                quantity={item.quantity}
                                price={item.price}
                                total={item.price * item.quantity}
                                id={item.id} 
                                />
                            ))
                            }
                              
                             
                        </tbody>
                    </table>
    );
}

export default EUATable;