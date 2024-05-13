import { HiOutlineSearch } from "react-icons/hi";
import { useEUA } from '../hooks/useEUA'
function EUASearch() {
    const { products, setProductsFilter, categories, productsFilter } = useEUA()

    const filterProducts = (filters) => {
        return products.filter(product => {
            const nameFilter = filters.name ? product.name.toLowerCase().includes(filters.name) : true
            const categoryFilter = filters.category ? (
                product.category[0].toLowerCase().includes(filters.category) ||
                product.category[1].toLowerCase().includes(filters.category)
            ) : true

            return nameFilter && categoryFilter
        });
    }
    const filterStock = () => {
        return productsFilter.filter(product => {
            return product.quantity < 1
        })
    }

    const handleChangeSearch = (event) => {
        const search = event.target.value.toLowerCase()
        setProductsFilter(filterProducts({ name: search }))
    }

    const handleChangeCategory = (event) => {
        const category = event.target.value.toLowerCase()
        setProductsFilter(filterProducts({ category }))
    }
    const handleChangeStock = (event) => {
        const stock = event.target.value === "true"
        const filteredProducts = stock ? filterStock() : products
        setProductsFilter(filteredProducts)
    };



    return (
        <div className='product__search--box'>
            <h4>Look for</h4>

            <form className='product__search--input'>
                <button>
                    <HiOutlineSearch />
                </button>
                <input type="text" name="Search" onChange={handleChangeSearch} placeholder='Name ...' />
            </form>

            <select onChange={handleChangeCategory} className="select__category__eua" name="Category" >
                <option value="">Categories</option>
                {
                    categories.map((item, index) => (
                        <option key={index} value={item.title}>{item.title}</option>
                    ))
                }
            </select>

            <select name="BuscarStock" onChange={handleChangeStock}>
                <option value={false} >Stock Quantity</option>
                <option value={true} >Stock 0</option>

            </select>
        </div>
    );
}

export default EUASearch; 