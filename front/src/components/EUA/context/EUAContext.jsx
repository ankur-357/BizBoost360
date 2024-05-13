import { createContext, useState, useEffect } from 'react'
import {categoryData } from '../components/data'
import {
    sweetAlertsError,
  } from "../../../components/Utils/alerts/sweetAlerts";
  import { useDispatch,useSelector } from "react-redux";
  import { createSaleAction } from "../../../redux/actionSales"
  import {getSalesCount} from '../../../redux/actionSales'

export const EuaContext = createContext()

export default function EuaProvider({ children }){
    const [productsTable, setProductsTable] = useState([])
    const [productsFilter,setProductsFilter] = useState([])
    const [products,setProducts]= useState([])
    const user = useSelector(state => state.user.user)
    const [localCurrency ,setLocalCurrency ] = useState("")
    const [divisa,setDivisa] = useState("USD")
    const [divisaValue, setDivisaValue] = useState(null)
    const [totalToPay,setTotalToPay] = useState('0')
    const [companyID,setCompanyID] = useState("")
    
    const dispatch = useDispatch();
    const [bill,setBill] = useState(Number)
    const categories = categoryData
    

    useEffect(()=>{
        totalFunction()
    },[productsTable])

    

    const totalFunction = () => {
        let total = 0
      
        if (productsTable.length > 0) {
            productsTable.forEach(item => {
            total += item.price * item.quantity
          });
          setTotalToPay(total.toFixed(2))
        }else{
            return setTotalToPay(total)
        }
    }

    const upadteQuantity = (id, operation) => {
        setProductsTable((prevProducts) => {
          return prevProducts.map((product) => {
            if (product.id === id) {
              const newQuantity = operation === "plus" ? product.quantity + 1 : Math.max(product.quantity - 1, 1)
              return { ...product, quantity: newQuantity }
            }
            return product
          })
        })
    }
      
    const addToTable = (data) => {
        const { id } = data
        const productInTableIndex = productsTable.findIndex(item => item.id === id)

        if (productInTableIndex >= 0) {
            const newproductsTable = structuredClone(productsTable)
            newproductsTable[productInTableIndex].quantity += 1
            return setProductsTable(newproductsTable)
          }

        const newTable = [
            ...productsTable,
            {
                ...data
            }
        ] 
        return setProductsTable(newTable)
    }

    const removeToTable = (id)=>{
        const newTable = productsTable.filter(item => item.id !== id)
        return setProductsTable(newTable)
    }

    const clearTable = ()=>{
        setProductsTable([])
    }

    const generateSale = async () => {
        try {
          if (totalToPay < 1) {
            sweetAlertsError("Factura vacía", "No puedes generar facturas vacías", "OK")
            return
          }
           dispatch(createSaleAction(generateDataSale()))
            setTimeout(async () => {
              const billCount = await getSalesCount(user.companyID)
              setBill(billCount)
              setProductsTable([])
            }, 1000)
        } catch (error) {
          console.error("Error en generateSale:", error)
        }
      }
      
    const generateDataSale = () =>{
        const sold_Products = 
            productsTable.map(item =>{
                let total = item.quantity * item.price
                return {
                    product:item.id,
                    quantity:item.quantity,
                    totalPriceProduct:total
                }
            })
        const data = {
            total:parseFloat(totalToPay),
            company:companyID,
            sold_Products
        }
        return data
    }

    return(
        <EuaContext.Provider value={{
            products,
            productsFilter,
            setProductsFilter,
            categories,
            setProductsTable,
            productsTable,
            addToTable,
            removeToTable,
            upadteQuantity,
            clearTable,
            totalToPay,
            localCurrency,
            divisaValue,
            generateSale,
            setProducts,
            companyID,
            setCompanyID,
            bill,
            setBill,
            setLocalCurrency,
            setDivisaValue
            }}>
            { children }
        </EuaContext.Provider>
    )
}
