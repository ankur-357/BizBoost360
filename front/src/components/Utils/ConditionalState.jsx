import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types'; 

const ConditionalState = (props) => {
    const stock = props.stock;

    return (
        <div>
            {stock === 0 || stock === null ? (<CancelIcon className='text-red-600'/>) 
            : (stock <= 5 ? (<WarningIcon className='text-yellow-500'/>)
            : (<CheckCircleIcon className='text-green-600'/>))}
        </div>
    )
}
// Define prop types for ConditionalState component
ConditionalState.propTypes = {
    stock: PropTypes.number // Assuming stock is a number, adjust as needed
};


export default ConditionalState;