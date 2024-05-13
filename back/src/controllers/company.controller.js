import User from "../models/user.model.js";
import Company from "../models/company.model.js";
import { uploadImage } from "../utils/cloudinary.js"

// Company registration
export const registerCompany = async (req, res) => {
    const { name, sector, modelCurrency, image } = req.body;
    const { id } = req.params;
    try {
        if (!id) return res.status(404).json({ message: "User not found" });
        const imageClodinary = await uploadImage(image);
        const newCompany = new Company({
            name,
            sector,
            modelCurrency,
            user: id,
            image: {
                url: imageClodinary.url,
                public_id: imageClodinary.public_id,
            },
        })
        await newCompany.save();
        const updatedUser = await User.findByIdAndUpdate(id, { UA: true, $push: { companyID: newCompany._id } }, { new: true });
        return res.status(201).json({
            userData: {
                name: updatedUser.name,
                email: updatedUser.email,
                UA: updatedUser.UA,
            },
            companyData: newCompany,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//  Octener data of a company by id
export const getCompany = async (req, res) => {
    const { id } = req.params
    try {
        const company = await Company.findById(id)
        if (!company) return res.send("The company has not been found").status(404)

        res.send(company).status(200)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal error" })
    }
}

// Update Company
export const updateCompany = async (req, res) => {
    const { id } = req.params
    try {
        const updateCompany = Company.findByIdAndUpdate(id, req.body, { new: true })
        res.send(updateCompany).status(201)
    } catch (error) {
        console.log(error)
        res.send().status(500)

    }
}

export const getEmployes = async (req, res) => {
    const { id } = req.params
    try {
        const employes = await User.find({ companyID: id })
        res.status(200).json(employes)

    } catch (error) {
        console.log(error)
        res.send().status(500)
    }
}