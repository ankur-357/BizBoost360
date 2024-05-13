import Category from "../models/category.model.js";

// ? Crear categoria
export const createCategory = async (req, res) => {
    const { companyID } = req.params
    const { title, description } = req.body
    try {
        const newCategory = await Category.create({
            title,
            description,
            companyID
        })
        await newCategory.save()
        res.status(200).json({ title, description })
    } catch (error) {
        console.log(error)
        res.status(500).send("internal error")
    }
}

// ? Octener categorias
export const getCategories = async (req, res) => {
    const { companyID } = req.params
    try {
        const categories = await Category.find({ companyID })
        res.status(200).json(categories)
    } catch (error) {
        console.loge(error)
        res.status(500).send("internal error")
    }
}

// ? Eliminar categoria
export const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
        await Category.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted category" })
    } catch (error) {
        console.loge(error)
        res.status(500).send("internal error")
    }
}