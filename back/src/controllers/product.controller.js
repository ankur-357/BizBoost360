import Product from "../models/product.model.js";
import Company from "../models/company.model.js";
import { deleteImageCloudinary, uploadImage } from "../utils/cloudinary.js";

// ? Octoner un producto
export const getProduct = async (req, res) => {
  const { id, companyId } = req.params;
  if (!id || !companyId)
    return res.status(400).json({ message: "Incorrect request" });
  try {
    const product = await Product.findById(id);
    if (!product)
      return res.status(400).json({ message: "Product not found" });

    if (product.company.valueOf() !== companyId)
      return res.status(400).json({ message: "Product not found" });

    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.send().status(500);
  }
};

// ? Octener all products of a company
export const getProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.find({ company: id });
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.send().status(500);
  }
};

//? Create Product
export const createProduct = async (req, res) => {
  const {
    name,
    price,
    quantity,
    description,
    category,
    currency,
    company,
    image,
  } = req.body;

  try {
    const FoundCompany = await Company.findById(company);
    if (!FoundCompany)
      return res.status(404).json({ message: "The company does not exist" });

    const imageClodinary = await uploadImage(image);

    const newProduct = new Product({
      name,
      price,
      quantity,
      category,
      description,
      currency,
      company,
      image: {
        url: imageClodinary.url,
        public_id: imageClodinary.public_id,
      },
    });
    await newProduct.save();
    res.status(201).json({ message: "Successfully Created Product" });
  } catch (error) {
    console.error(error);
    res.send().status(500);
  }
};

//? delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let currentProduct = await Product.findById(id);

    if (!currentProduct) return res.status(400).json("The product does not exist");
    let imgCloudinary = currentProduct.image.public_id;

    if (imgCloudinary) {
      await deleteImageCloudinary(imgCloudinary);
    }
    const productDelete = await Product.findByIdAndDelete(id);

    res.status(200).send(`${productDelete.name} successfully removed`);
  } catch (error) {
    console.error(error);
    res.send().status(500);
  }
};

// ? Update a product
const updateData = async (currentProduct, newData) => {
  const data = { ...newData };
  if (currentProduct.name !== newData.name) {
    data.name = newData.name;
  } else {
    data.name = currentProduct.name;
  }
  if (currentProduct.description !== newData.description) {
    data.description = newData.description;
  } else {
    data.description = currentProduct.description;
  }
  if (currentProduct.image.url !== newData.image) {
    const imgCloudinaryDB = currentProduct.image.url;
    await deleteImageCloudinary(imgCloudinaryDB);
    const uploadImageCloudinary = await uploadImage(newData.image);
    data.image = uploadImageCloudinary;
  } else {
    data.image = currentProduct.image;
  }
  if (currentProduct.category !== newData.category) {
    data.category = newData.category;
  } else {
    data.category = currentProduct.category;
  }
  if (currentProduct.price !== newData.price) {
    data.price = newData.price;
  } else {
    data.price = currentProduct.price;
  }
  if (currentProduct.currency !== newData.currency) {
    data.currency = newData.currency;
  } else {
    data.currency = currentProduct.currency;
  }
  if (currentProduct.quantity !== newData.quantity) {
    data.quantity = newData.quantity;
  } else {
    data.quantity = currentProduct.quantity;
  }
  return data;
};
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    image,
    category,
    price,
    currency,
    quantity,
    company,
  } = req.body;
  const currentProduct = await Product.findById(id);
  if (!currentProduct)
    return res.status(400).json("Product not found in Data Base");
  const data = await updateData(currentProduct, {
    name,
    description,
    image,
    category,
    price,
    currency,
    quantity,
    company,
  });
  try {
    const uploadProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res.status(200).send(`Product ${uploadProduct.name} updated`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

