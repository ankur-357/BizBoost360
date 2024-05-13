import "../CreateProducts/CreateProducts.css";
import "./EditProducts.css";
import PropTypes from "prop-types";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ImageUploading from "react-images-uploading";
import imageDefault from "../../assets/Imagenes/logoFlecha.png";
import { useSelector } from "react-redux";

const PanelEditName = ({
  nombre,
  descripcion,
  imageProduct,
  onChangeImage,
  handleInputDescriptionChange,
  handleInputNameChange,
  handleInputEditChange,
  idEdit,
}) => {

  const { products } = useSelector((state) => state.products);
  //IMAGE
  const maxNumber = 69;

  return (

    <div id="formCreateProduct" className="panelCreate-container">
      <h2 className="title-createproduct">EDIT PRODUCT</h2>
      <p className="input-select-edit-label">Select the product:</p>
      <select
        id="input-options-edit"
        className="input-select-edit"
        onChange={handleInputEditChange}
        value={idEdit}
        name="edit"
      >
        <option key="default">Select</option>
        {products ? products.map((option, index) => (

          <option

            className="option-select-edit"
            key={index}
            value={option._id}
          // onClick={handleClickPanelOptions}
          >
            {option.name}
          </option>
        )) : null}
      </select>
      <label
        id="inputlabel-name"
        htmlFor="nameProduct"
        className="input-label"
      >
        Product name
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
        Product description
      </label>
      <textarea
        id="descriptionProduct"
        key={idEdit}
        onChange={handleInputDescriptionChange}
        type="text"
        name="description"
        value={descripcion}
        autoFocus={true}
        autoComplete="true"
        placeholder="Product description"
        className="input-description"
      />
      {/* ***************** Imagen **************** */}
      <p htmlFor="imgProduct" className="input-label">
        Product image
      </p>
      <div className="imageProduct-container">
        <ImageUploading
          id="imgProduct"
          key={idEdit}
          name="imageProduct"
          value={imageProduct ? imageProduct : imageDefault}
          onChange={onChangeImage}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({ onImageUpload, onImageRemove, isDragging, dragProps }) => (
            <div className="container-image-bottons">
              <div key={"url"} className="image-createProducts">
                <img
                  src={imageProduct ? imageProduct : imageDefault}
                  alt="imageUpload"
                  width="100"
                />
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
                  Add image
                </button>
                <button
                  type="button"
                  className="buttonUploadImage"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageRemove}
                  {...dragProps}
                >
                  <DeleteOutlineOutlinedIcon sx={{ mr: 1 }} />
                  Delete
                </button>
              </div>
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
};
PanelEditName.propTypes = {
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  imageProduct: PropTypes.string,
  handleInputEditChange: PropTypes.func.isRequired,
  handleInputNameChange: PropTypes.func.isRequired,
  handleInputDescriptionChange: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
  // handleClickPanelOptions: PropTypes.func.isRequired,
  idEdit: PropTypes.string.isRequired,
  // productEdit: PropTypes.object.isRequired,
};
export default PanelEditName;