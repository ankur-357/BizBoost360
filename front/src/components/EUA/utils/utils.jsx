import { APIKEY_CURRENCY } from "../../../config/config";

var myHeaders = new Headers();
myHeaders.append("apikey", APIKEY_CURRENCY);

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
export const convert = async (localCurrency, divisa) => {
  try {
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${localCurrency}&from=${divisa}&amount=1`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log('error', error);
  }
}






const formatNumber = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
};

export const getCurrentHour = () => {
    const time = new Date();
    const hours = formatNumber(time.getHours());
    const minutes = formatNumber(time.getMinutes());

    return `${hours}:${minutes}`;
};

export const getCurrentDate = ()=>{
    const fechaLocal = new Date();

    const day = formatNumber(fechaLocal.getDate());
    const month = formatNumber( fechaLocal.getMonth() + 1);
    const year = fechaLocal.getFullYear();

    return `${day}/${month}/${year}`
}