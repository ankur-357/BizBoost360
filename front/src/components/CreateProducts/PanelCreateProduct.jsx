import "./CreateProducts.css";
import PropTypes from "prop-types";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ImageUploading from "react-images-uploading";
import imageDefault from "../../assets/Imagenes/logoFlecha.png";

const PanelCreateProduct = ({
  nombre,
  descripcion,
  imageProduct,
  onChangeImage,
  handleInputDescriptionChange,
  handleInputNameChange,
}) => {
  //IMAGE
  const maxNumber = 69;

  return (
    <div id="formCreateProduct" className="panelCreate-container">
      <h2 className="title-createproduct">CREATE PRODUCT</h2>
      <label
        id="inputlabel-name"
        htmlFor="nameProduct"
        className="input-label"
      >
        Product Name
      </label>
      <input
        id="nameProduct"
        type="text"
        autoComplete="true"
        autoFocus={true}
        placeholder="Product Name"
        className="input-name"
        onChange={handleInputNameChange}
        value={nombre}
        name="name"
      />{" "}
      {/* ************ Descripción ************************* */}
      <label
        id="inputlabel-description"
        htmlFor="descriptionProduct"
        className="input-label"
      >
        Product Description
      </label>
      <textarea
        id="descriptionProduct"
        onChange={handleInputDescriptionChange}
        type="text"
        name="description"
        value={descripcion}
        autoFocus={true}
        autoComplete="true"
        placeholder="Product Description"
        className="input-description"
      />
      {/* ***************** Imagen **************** */}
      <p htmlFor="imgProduct" className="input-label">
        Product Picture
      </p>
      <div className="imageProduct-container">
        <ImageUploading
          id="imgProduct"
          name="imageProduct"
          value={imageProduct}
          onChange={onChangeImage}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({ onImageUpload, onImageRemove, isDragging, dragProps }) => (
            <div className="container-image-bottons">
              <div key={"url"} className="image-createProducts">
                <img src={!imageProduct ? imageDefault : imageProduct} alt="imageUpload" width="100" />
              </div>
              &nbsp;
              <div className="buttonsContainer">
                <button
                  type="button"
                  className="buttonUploadImage"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <AddPhotoAlternateOutlinedIcon sx={{ mr: 1 }} />
                  Add Image
                </button>
                <button
                  type="button"
                  className="buttonUploadImage"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageRemove}
                  {...dragProps}
                >
                  <DeleteOutlineOutlinedIcon sx={{ mr: 1 }} />
                  Erase
                </button>
              </div>
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
};
PanelCreateProduct.propTypes = {
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  imageProduct: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputNameChange: PropTypes.func.isRequired,
  handleInputDescriptionChange: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
};
export default PanelCreateProduct;