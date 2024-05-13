import Sale from "../models/sale.model.js"
import Company from "../models/company.model.js"
import Product from "../models/product.model.js"

// ? Generate a sale
export const createSale = async (req, res) => {
    const sale = req.body
    try {
        const company = await Company.findById(req.body.company)
        if (!company) return res.status(404).json({ message: "The company does not exist" })

        await Promise.all(sale.sold_Products.map(async (item) => {
            console.log(item.product)
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { quantity: -item.quantity } },
                { new: true }
            )
        }))


        const newSale = new Sale(sale);
        await newSale.save(sale)
        res.status(201).json({ message: "Registered sale" })

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Error')
    }
}

// ? Octener a sale by id
export const getSale = async (req, res) => {
    const user = req.user
    const { id } = req.params
    try {
        const company = await Company.findOne({ user: user.id })
        if (!company) return res.status(404).json({ message: "There is no company associated with your user" })

        const sale = await Sale.findById(id)
        if (!sale) return res.status(404).json({ message: "The sale does not exist" })

        res.status(200).json(sale)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Error')
    }
}

// ? Octener all sales of a company
export const getSales = async (req, res) => {
    // const user = req.user
    const { id } = req.params
    try {
        // const company = await Company.findOne({user:id})
        // if(!company) return res.status(404).json({message:"There is no company associated with your user"})

        const sales = await Sale.find({ company: id })
        res.status(200).json(sales)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Error')
    }
}


export const getSalesCount = async (req, res) => {
    const { id } = req.params
    try {
        const sales = await Sale.find({ company: id })
        if (!sales) return res.status(200).json(0)

        res.status(200).json(sales.length)
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Error')
    }
}