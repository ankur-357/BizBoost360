import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import "./LandingUA.css";
import { Box } from "@mui/material";
import gestionInventario from "../../assets/Imagenes/gestionInventario.jpg";
const UserProfile = () => {
    const [user, setUser] = useState(null);
    const localUser = JSON.parse(localStorage.getItem("user"));
    console.log(localUser)
    const userId = localUser.id
    const { company } = useSelector((state) => state.company);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`/api/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [localUser]);

    if (!localUser) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ backgroundImage: `url(${gestionInventario})`, backgroundSize: "cover", opacity: "1", minHeight: '1000px' }}>
            <section style={{ paddingBottom: '50px' }}>
                {company.image ? (
                    <Box sx={{ backgroundColor: "white", opacity: "0.6" }}>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                mt: 2,
                            }}
                        >
                            <div>
                                <h1 className="company-name-landingUA" style={{ color: "black", fontWeight: "bold" }}>{company.name}</h1>
                                <p>ID: {company._id}</p>
                            </div>
                            <div className="image-company-landingUA">
                                <img src={company.image.url} className="landingUA-img-company" />
                            </div>
                        </Box>
                    </Box>
                ) : null}
            </section>
            <div style={{ backgroundColor: "white", opacity: "0.8", fontSize: '2em', fontWeight: 'bold', color: 'black' }}>
                <div className='employes__card'>
                    <h2 style={{ color: 'black', fontWeight: 'bold' }}>User Profile</h2>
                    <p style={{ color: 'black', fontWeight: 'bold' }}>Name: {localUser.name}</p>
                    <p style={{ color: 'black', fontWeight: 'bold' }}>Email: {localUser.email}</p>
                    <p style={{ color: 'black', fontWeight: 'bold' }}>CompanyID: {localUser.companyID}</p>
                    {/* Add more profile details as needed */}
                </div>
            </div>
        </div>

    );

};

export default UserProfile;
