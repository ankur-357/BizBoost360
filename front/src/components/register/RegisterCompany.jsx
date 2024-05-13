// import React from "react";
import ButtonBack from "../Utils/Buttons/ButtonBack";
import Header from "../shared/Header/Header";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import validationRC from "../Utils/validaciones/validacionRC";
import { companyRegisterAction } from "../../redux/actionsCompany";
import ImageUploading from "react-images-uploading";
import imageDefault from "../../assets/Imagenes/logoFlecha.png";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const RegisterCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const maxNumber = 69;

  //ESTADO QUE MANEJA LOS INPUTS
  const [input, setInput] = useState({
    name: "",
    sector: "",
    country: "",
    image: "",
  });

  //ESTADO QUE MANEJA ERRORES
  const [errors, setErrors] = useState({
    name: "",
    sector: "",
    country: "",
    image: "",
  });

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validationRC({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const onChangeImage = (imageList) => {
    const imageUrl = imageList.shift();
    setInput({
      ...input,
      image: imageUrl.data_url,
    });
  };

  const { user } = useSelector((state) => state.user);

  const userId = user.id;
  // console.log("REGISTER COMPANY USER", user)
  const submitHandler = (e) => {
    e.preventDefault();
    if (userId) {
      dispatch(companyRegisterAction(input, userId));
      setTimeout(function () {
        setInput({
          name: "",
          sector: "",
          country: "",
          image: "",
        });
        setErrors({
          name: "",
          sector: "",
          country: "",
          image: "",
        });
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="ml-20 mt-10">
        <ButtonBack />
      </div>
      <h1 className="text-4xl text-center font-semibold font-barlow-condensed">
        Registro de Empresa
      </h1>
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-2 gap-24 mx-40 mt-10"
      >
        <div className="mt-10 font-roboto">
          <div className="flex flex-col mt-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre de la Empresa"
              value={input.name}
              onChange={inputHandler}
              className="border-2 border-gray-400 p-2 rounded-lg"
            />
            {errors.name ? (
              <p className="text-xs text-pink-700">{errors.name}</p>
            ) : null}
          </div>
          <div className="flex flex-col mt-4">
            <input
              type="text"
              id="sector"
              name="sector"
              placeholder="Sector-Industria"
              value={input.sector}
              onChange={inputHandler}
              className="border-2 border-gray-400 p-2 rounded-lg"
            />
            {errors.sector ? (
              <p className="text-xs text-pink-700">{errors.sector}</p>
            ) : null}
          </div>
          <div className="flex flex-col mt-4">
            <input
              type="text"
              id="country"
              name="country"
              placeholder="País de origen"
              value={input.country}
              onChange={inputHandler}
              className="border-2 border-gray-400 p-2 rounded-lg"
            />
            {errors.country ? (
              <p className="text-xs text-pink-700">{errors.country}</p>
            ) : null}
          </div>
        </div>
        {/* ***************************CARGA DE LA IMAGEN************************ */}
        <div>
          <p
            htmlFor="logoCompany"
            className="font-medium text-2xl text-gray-600 font-barlow-condensed"
          >
            Logo Empresa
          </p>
          <div className="border-2 border-gray-400  rounded-xl bg-white mt-2 p-4 h-auto">
            <ImageUploading
              id="logo"
              name="logoCompany"
              value={input.image}
              onChange={onChangeImage}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({ onImageUpload, onImageRemove, isDragging, dragProps }) => (
                <div>
                  <div key={"url"}>
                    <img
                      src={!input.image ? imageDefault : input.image}
                      alt="imageUpload"
                      width="100"
                    />
                  </div>
                  <div className="w-auto mt-6 flex justify-end">
                    <button
                      type="button"
                      className="flex w-4/5"
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <AddPhotoAlternateOutlinedIcon className="m-1 text-sx font-roboto" />
                      Agregar Imagen
                    </button>
                    <button
                      type="button"
                      className="flex w-4/5"
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageRemove}
                      {...dragProps}
                    >
                      <DeleteOutlineOutlinedIcon className="m-1 text-sx font-roboto" />
                      Borrar
                    </button>
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
          {errors.image ? (
            <p className="text-xs text-pink-700">{errors.image}</p>
          ) : null}
        </div>
        <div className=" flex justify-center mt-6 col-span-2">
          <button
            type="submit"
            className="w-[150px] h-[40px] bg-[#4DD0E1] hover:bg-[#B2EBF2] text-white hover:text-[#00bcd4] border-[#4DD0E1] font-bold text-sm rounded-md animate-pulse"
          >
            {" "}
            ENVIAR{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCompany;
