import { Box, Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";
import monedas from "../../assets/Monedas.json";
import CurrencyInput from "react-currency-input-field";

const PanelOptions = ({
  nombre,
  description,
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
  cantidad,
  handleDeleteInput
}) => {
  /*     sx={{
          display:"flex",
          width: "25em",
          p: 2,
          backgroundColor: "white",
          borderRadius: "5px",
          // border: "1px solid red",
        }}*/
  return (
    <Box >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography className="title-panelOptions">Options Panel</Typography>
        <div id="formOptions" className="panelOptionsForm-container">
          <Typography className="title-options">Enter product options:</Typography>

          {/* CATEGORY */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="option">Category:</p>
            <input
              id="input-options-category"
              type="text"
              className="input-select"
              placeholder="New value"
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
            <p className="option-moneda-label">Coin:</p>
            <select
              id="input-options-currency"
              className="input-select-currency"
              onChange={handleInputCurrencyChange}
              value={moneda}
              name="currency"
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
              id={precio}
              value={precio}
              onValueChange={handleInputPriceChange}
              className="input-precio-panelOptions"
              onFocus={handleDeleteInput}
            />

            <Button
              type="submit"
              variant="contained"
              elevation={0}
              onClick={handleClickPanelOptions}
              sx={{
                marginLeft: ".9em",
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
        {/* QUANTITY*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "5px"
          }}
        >
          <p className="option">Quantity:</p>
          <input
            className="input-quantity"
            type="number"
            name="quantity"
            value={cantidad}
            onChange={handleInputQuantityChange}
            placeholder="Quantity of Products"
          />
          <Button
            type="submit"
            variant="contained"
            elevation={0}
            onClick={handleClickPanelOptions}
            sx={{
              marginLeft: ".6em",
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
            <img src={imageProduct} width="120"></img>
          </Box>
          <h2 className="previewH2">
            Name: <p className="previewH3">{nombre}</p>
          </h2>
          <h2 className="previewH2">
            Description: <p className="previewH3">{description}</p>
          </h2>
          <h2 className="previewH2">
            Quantity: <p className="previewH3">{quantity}</p>
          </h2>
          <h2 className="previewH2">
            Category: <p className="previewH3">{category}</p>{/* .join(", ") */}
          </h2>
          <h2 className="previewH2">
            Price:{" "}
            <p className="previewH3">
              {currency} {price}
            </p>
          </h2>
        </Box>
      </Box>
    </Box>
  );
};
PanelOptions.propTypes = {
  nombre: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageProduct: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  moneda: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  precio: PropTypes.number.isRequired,
  cantidad: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  category: PropTypes.array.isRequired,
  input: PropTypes.string.isRequired, //categoria
  handleClickPanelOptions: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputPriceChange: PropTypes.func.isRequired,
  // onValueChange: PropTypes.func.isRequired,
  handleInputCurrencyChange: PropTypes.func.isRequired,
  // nameInputPrice:PropTypes.string.isRequired,
  handleInputQuantityChange: PropTypes.func.isRequired,
  handleDeleteInput: PropTypes.func.isRequired,
};
export default PanelOptions;