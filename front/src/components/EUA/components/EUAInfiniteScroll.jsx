import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TbBasketOff } from "react-icons/tb";
import EUACard from "./EUACard";
import { productsData } from "./data";
import { useEUA } from '../hooks/useEUA'
function EUAInfiniteScroll() {
    const { productsFilter } = useEUA()
    const [visibleItems, setVisibleItems] = useState(6);

    const fetchMoreData = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 6);
    };

    return (
        <section className='EUA__list__products' id='infinityScroll'>
            <InfiniteScroll className='EUA__list__products__ifinity'
                dataLength={visibleItems}
                next={fetchMoreData}
                hasMore={visibleItems < productsData.length}
                loader={<h5>Producto no encontrado</h5>}
                scrollableTarget="infinityScroll"
            >

                {productsFilter.length !== 0 ? productsFilter.slice(0, visibleItems).map((item) => (
                    <EUACard
                        key={item._id}
                        name={item.name}
                        price={item.price}
                        category={item.category}
                        image={item.image}
                        currency={item.currency}
                        quantity={item.quantity}
                        id={item._id}

                    />
                ))
                    : <div className='EUA__list__off'>
                        <TbBasketOff />
                    </div>

                }

            </InfiniteScroll>

        </section>
    );
}

export default EUAInfiniteScroll;