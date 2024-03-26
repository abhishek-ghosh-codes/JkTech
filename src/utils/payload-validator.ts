import Validator from 'validatorjs';


const validate = (data: any, rules: Validator.Rules) => {
    
    const validation = new Validator(data, rules);
    if (validation.passes()) {
      return true;
    }
    else {
       let arrList: any[] = [];
        Object.values(validation.errors.all()).forEach(element => {
            arrList = [...element, ...arrList];
        });
        const error = new Error(`${JSON.stringify({errors: arrList})}`);
        error.name = 'Invalid Payload';
        throw error;
    }

}
export default validate