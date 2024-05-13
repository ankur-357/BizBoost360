const validationRC = (input) => {
    let errors = {};

    if (!input.name) { errors.name = 'You must enter the name of your Company' }
    if (!input.sector) { errors.sector = 'You must indicate the Industry or Sector to which your Company is dedicated.' }
    if (!input.country) { errors.country = 'You must indicate the country of origin of your Company' }
    if (!input.image) {
        errors.image = 'If you do not choose a logo for your Company, we will use the BizBoost360 one';
        setTimeout(() => { errors.image = ''; }, 2000)
    }

    return errors
}



export default validationRC;