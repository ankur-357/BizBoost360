import { FaUserSlash, FaTrash } from "react-icons/fa"
import { deleteUser } from "../../redux/actionsUser"


function EmployeesViews({ employes, getEmployes }) {

    const handleDeleteEmployer = async (id) => {
        const res = await deleteUser(id)
        console.log(res)
        await getEmployes()
    }

    return (
        <section className="employes__view">
            {
                employes?.length > 0 ?
                    (
                        employes?.map((employee) => (
                            <article key={employee._id} className="employes__card" >
                                <button
                                    onClick={() => {
                                        handleDeleteEmployer(employee._id)
                                    }}
                                    className="delete__employes">
                                    <FaTrash />
                                </button>
                                <img src="https://i.imgur.com/L2D9Elb.png" alt={employee.name} />
                                <h4>{employee.name}</h4>
                                <p>{employee.email}</p>
                            </article>
                        ))
                    )
                    : (
                        <div className="no_employees">
                            <FaUserSlash />
                            <h3>No registered employees</h3>
                        </div>
                    )
            }
        </section>
    );
}

export default EmployeesViews;