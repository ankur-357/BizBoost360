import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";
import monedas from "../../assets/Monedas.json";
import CurrencyInput from "react-currency-input-field";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const PanelEditOptions = ({
  nombre,
  descripcion,
  imageProduct,
  price,
  moneda,
  currency,
  precio,
  category,
  handleClickPanelOptions,
  handleInputChange,
  handleInputPriceChange,
  handleInputCurrencyChange,
  input,
  quantity,
  handleInputQuantityChange,
  handleCategoryDelChange,
  cantidad,
  idEdit,
  // categoryDel,
  categoria
}) => {
  return (

    <Box sx={{ width: "100%" }}>
      <h2 className="title-panelOptions">Panel Opciones</h2>
      <div id="formOptions" className="panelOptionsForm-container">
        <h2 className="title-options">
          Product edit options: {idEdit}
        </h2>

        {/* CATEGORIA */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: 0.5,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            // border: "1px solid red"
          }}
        >
          <p className="option">Delete Category:</p>
          <select
            id="input-options-categoryDel"
            type="text"
            className="input-select-category-del"
            placeholder="New value"
            onChange={handleCategoryDelChange}
            value={category.indexOf(categoria)}
            name="category-del"
            multiple={false}
          >
            <option key="default" value="Seleccione Categoría" >Select</option>
            {category && category.length >= 1 ? (category.map((option, index) => (
              <option
                className="option-select-edit"
                key={index}
                value={index}
              >
                {option}
              </option>
            ))
            ) : null}
          </select>
          <Button
            type="submit"
            variant="contained"
            elevation={0}
            onClick={handleClickPanelOptions}
            sx={{
              marginLeft: ".5em",
              height: "2.8em",
              backgroundColor: "red",
              borderRadius: "5px",
              justifyContent: "center",
              ["&:hover"]: { backgroundColor: "#B2EBF2", color: "#00BCD4" },
            }}
          >
            <DeleteOutlineOutlinedIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: 0.5,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="option">Add Category:</p>
          <input
            id="input-options-category"
            type="text"
            className="input-select"
            placeholder="Nuevo valor"
            onChange={handleInputChange}
            value={input}
            name="category"
          />
          <Button
            type="submit"
            variant="contained"
            elevation={0}
            onClick={handleClickPanelOptions}
            sx={{
              marginLeft: ".5em",
              height: "2.8em",
              backgroundColor: "#00bcd4",
              borderRadius: "5px",
              justifyContent: "center",
              ["&:hover"]: { backgroundColor: "#B2EBF2", color: "#00BCD4" },
            }}
          >
            <SaveIcon />
          </Button>
        </Box>
        {/* PRECIO Y MONEDA */}
        {/*MONEDA*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mt: "5px",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p className="option-moneda-label">Currency:</p>
          <select
            id="input-options-currency"
            className="input-select-currency"
            onChange={handleInputCurrencyChange}
            value={moneda}
            name="currency"
            multiple={false}
          >
            {monedas.map((option) => (
              <option
                className="option-select-currency"
                key={option.abreviacion}
                value={option.simbolo}
              >
                {option.country}
                {":"} {option.abreviacion}
              </option>
            ))}
          </select>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >

          {/*PRECIO*/}
          <p className="option-precio-label">Price:</p>
          <CurrencyInput
            id="input-precio"
            value={precio}
            onValueChange={handleInputPriceChange}
            className="input-precio-panelOptions"
          />

          <Button
            type="submit"
            variant="contained"
            elevation={0}
            onClick={handleClickPanelOptions}
            sx={{
              marginLeft: ".5em",
              height: "2.8em",
              backgroundColor: "#00bcd4",
              borderRadius: "5px",
              justifyContent: "center",
              ["&:hover"]: { backgroundColor: "#B2EBF2", color: "#00BCD4" },
            }}
          >
            <SaveIcon />
          </Button>
        </Box>
      </div>
      {/* CANTIDAD*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 0.5,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="option">Amount:</p>
        <input
          className="input-quantity"
          type="number"
          name="quantity"
          value={cantidad}
          onChange={handleInputQuantityChange}
          placeholder="Cantidad de Productos"
        />
        <Button
          type="submit"
          variant="contained"
          elevation={0}
          onClick={handleClickPanelOptions}
          sx={{
            marginLeft: ".5em",
            height: "2.8em",
            backgroundColor: "#00bcd4",
            borderRadius: "5px",
            justifyContent: "center",
            ["&:hover"]: { backgroundColor: "#B2EBF2", color: "#00BCD4" },
          }}
        >
          <SaveIcon />
        </Button>
      </Box>
      {/*VISTA PREVIA*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid grey",
          borderRadius: "8px",
          p: 1,
          mt: 2,
          mr: 1,
          ml: 1,
          mb: 1,
          fontFamily: "Barlow Condensed",
          fontWeight: "500",
        }}
      >
        <Box sx={{ height: "6em", alignSelf: "center" }}>
          <img src={!imageProduct ? null : imageProduct} width="120"></img>
        </Box>
        <h2 className="previewH2">
          Name: <p className="previewH3">{nombre}</p>
        </h2>
        <h2 className="previewH2">
          Description: <p className="previewH3">{descripcion}</p>
        </h2>
        <h2 className="previewH2">
          Amount: <p className="previewH3">{quantity}</p>
        </h2>
        <h2 className="previewH2">
          Category: <p className="previewH3">{category ? category.join(", ") || category[0] : null}</p>
        </h2>
        <h2 className="previewH2">
          Price:{" "}
          <p className="previewH3">
            {currency} {!price ? null : price}
          </p>
        </h2>
      </Box>
    </Box>

  );
};
PanelEditOptions.propTypes = {
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  imageProduct: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  moneda: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  cantidad: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  category: PropTypes.array.isRequired,
  input: PropTypes.string.isRequired,
  handleClickPanelOptions: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputPriceChange: PropTypes.func.isRequired,
  handleInputCurrencyChange: PropTypes.func.isRequired,
  handleInputQuantityChange: PropTypes.func.isRequired,
  idEdit: PropTypes.string.isRequired,
  handleCategoryDelChange: PropTypes.func.isRequired,
  // categoryDel: PropTypes.string.isRequired,
  categoria: PropTypes.array.isRequired,
};
export default PanelEditOptions;