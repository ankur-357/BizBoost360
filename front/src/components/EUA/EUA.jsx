import './style.css'
import { useState, useEffect } from 'react'
import Header from '../shared/Header/Header';
import EUAHeader from './components/EUAheader';
import CardList from './components/datalist';
import EUATable from './components/EUATable';
import { headerTableData } from './components/data';
import { useDispatch, useSelector } from "react-redux";
import { getCurrentHour, getCurrentDate } from './utils/utils';
import { useEUA } from './hooks/useEUA'
import EUAInfiniteScroll from './components/EUAInfiniteScroll';
import EUASearch from './components/EUASearch';
import EUAButton from './components/EUAButton';
import { convert } from './utils/utils'

function EUA() {
    const [currentHour, setCurrentHour] = useState(getCurrentHour())
    const [currentDate, setCurrentDate] = useState(getCurrentDate())
    const [totalToPayDivisa, setTotalToPayDivisa] = useState()
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    //****************LOCAL STOREAGE ********************* */
    const userLocal = JSON.parse(localStorage.getItem('user'));
    const companyId = userLocal ? userLocal.companyID[0] : user.companyID;
    //*************************************************** */   
    const company = useSelector(state => state.company.company)
    const productsData = useSelector(state => state.products.products);

    const {
        bill,
        totalToPay,
        divisaValue,
        productsTable,
        localCurrency,
        setProducts,
        setProductsFilter,
        setCompanyID,
        setLocalCurrency,
        setDivisaValue } = useEUA()

    useEffect(() => {
        setProducts(productsData)
        setProductsFilter(productsData)
        setLocalCurrency(company.modelCurrency.abbreviation)
        //if(!user){
        //*****LOCAL STORAGE******** */
        if (!user || !userLocal) {
            return
        }
        //setCompanyID(user.companyID[0])
        //********LOCAL STORAGE******* */
        setCompanyID(companyId)
    }, [dispatch])

    // ? Hora
    useEffect(() => {
        const interval = setInterval(() => {
            const time = getCurrentHour()
            setCurrentHour(time)
        }, 1000)
        return () => clearInterval(interval);
    }, []);

    // ? Fecha
    useEffect(() => {
        const interval = setInterval(() => {
            const time = getCurrentDate()
            setCurrentDate(time)
        }, 1000)
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const getExchangeRate = async () => {
            if (localCurrency === "") return
            const newValue = await convert(localCurrency, "USD")
            return setDivisaValue(newValue.result)
        }
        getExchangeRate()
    }, [localCurrency])


    useEffect(() => {
        const newValue = totalToPay / divisaValue
        if (newValue > -1) {
            setTotalToPayDivisa(newValue.toFixed(2))
        } else {
            setTotalToPayDivisa(0)
        }
    }, [totalToPay])

    const Divisa = "USD$"

    return (
        <div className='EUA__view__container'>
            <Header />
            <section className='EUA__sales__views'>

                <EUAHeader name={company.name} img={company?.image?.url} />

                <section className='EUA__info__and__total'>
                    <dl className='EUA__info'>
                        <div className='EUA__fecha'>
                            <CardList title={'Fecha'} info={currentDate} sale={false} />
                            <CardList title={'Hora'} info={currentHour} sale={false} />
                        </div>
                        <div className='EUA__sale__info'>
                            <CardList title={`Venta N°`} info={bill} sale={false} />
                            <CardList title={'Cajero'} info={user.name} sale={false} />
                        </div>
                    </dl>
                    <div className='EUA__total'>
                        <CardList title={`Total en ${localCurrency}`} info={totalToPay} sale={true} />
                        <CardList title={`Total en ${Divisa}`} info={totalToPayDivisa} sale={true} />
                    </div>

                </section>

                <section className='EUA__sales'>
                    <div className='EUA__product__container'>
                        <div className='EUA__table__Product'>
                            <EUATable headerTableData={headerTableData} />
                        </div>
                        <div className='EUA__items__Product'>
                            <h2>
                                Items:
                            </h2>
                            <span>
                                {productsTable.length}
                            </span>
                        </div>
                    </div>

                    <div className='EUA__list__products__container'>
                        <div className='EUA__products__search'>
                            <EUASearch />
                        </div>
                        <div className='EUA__list__products--box'>
                            <EUAInfiniteScroll />
                            <EUAButton />
                        </div>

                    </div>
                </section>

            </section>
        </div>
    );
}

export default EUA;