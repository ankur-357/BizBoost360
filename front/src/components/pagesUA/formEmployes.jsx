import { userLoginSchema } from "../../Schemas/loginSchema";
import { sweetAlertsError, sweetAlertsSuccessfully } from "../Utils/alerts/sweetAlerts";
import { registerEUA } from "../../redux/actionsUser";
import { useSelector } from "react-redux";
import { ZodError } from "zod";
import { useRef, useState } from 'react';
import './EmployeeControl.css'
import { MdOutlineEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

function FormEmployes({ getEmployes }) {
  const formRef = useRef(null);
  const passwordRef = useRef(null)
  const company = useSelector(state => state.company)
  const localUser = JSON.parse(localStorage.getItem("user"));
  console.log(localUser)
  console.log(company)
  const [views, setViews] = useState(false)

  const handlerSubmitEmployes = async (event) => {
    event.preventDefault()

    if (!localUser.companyID) {
      return sweetAlertsError("You have not started section")
    }

    const { name, email, password } = event.target.elements
    const data = {
      name: name.value,
      email: email.value,
      password: password.value,
      companyID: localUser.companyID
    }
    try {
      userLoginSchema.parse(data)
      const res = await registerEUA(data)
      formRef.current.reset()
      setViews(false)
      getEmployes()
      sweetAlertsSuccessfully(res.data.message)
    } catch (error) {
      if (error instanceof ZodError) {
        sweetAlertsError(
          "Error validating data",
          error.errors[0].message,
          "Ok")
      }
    }
  }
  const handlerViews = (value) => {

    if (value) {
      passwordRef.current.type = "text"

    } else {
      passwordRef.current.type = "password"
    }

  }
  return (
    <section className="employes__form__container">
      <form
        className="employes__form"
        ref={formRef}
        onSubmit={handlerSubmitEmployes}>
        <div className="employes__form__company">
          <div className="employes__form__company--img">
            <img src={company?.image?.url}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://i.imgur.com/L2D9Elb.png';
              }} alt={company.name} />
          </div>
          <h3>Register Employee</h3>
        </div>
        <div className="employes__form__input--box">
          <input type="text" name="name" placeholder="Ankur kumar" />
          <FaUser />
          <label >Name</label>
        </div>
        <div className="employes__form__input--box">
          <input type="email"
            name="email"
            placeholder="Camilo_leroy@gamil.com" />
          <MdOutlineEmail />
          <label >Mail</label>
        </div>
        <div className="employes__form__input--box">
          <input ref={passwordRef}
            type="password"
            name="password"
            placeholder="********" />
          <button type="button"
            onClick={() => {
              setViews(!views)
              handlerViews(!views)
            }}>
            {views ? <IoMdEye /> : <IoIosEyeOff />}
          </button>
          <label> Password </label>
        </div>
        <button className="employes__form--bnt" type="submit">Create User</button>
      </form>
    </section>
  );
}

export default FormEmployes;

