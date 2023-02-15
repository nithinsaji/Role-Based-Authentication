import { useState, useEffect } from "react";

export const usePasswordValidation = ({ firstPassword = "", secondPassword = "" }) => {
    const [validLength, setValidLength] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [specialChar, setSpecialChar] = useState(false);
    const [match, setMatch] = useState(false);
    const [valid,setValid]= useState(false)

    useEffect(() => {
        setValidLength(firstPassword.length >= 8 ? firstPassword.length <= 16 ? true : false : false);
        setUpperCase(firstPassword.toLowerCase() !== firstPassword);
        setLowerCase(firstPassword.toUpperCase() !== firstPassword);
        setHasNumber(/\d/.test(firstPassword));
        setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword));
        setMatch(firstPassword && firstPassword === secondPassword);
    }, [firstPassword, secondPassword]);

    useEffect(()=>{
        validLength && hasNumber && upperCase && lowerCase && specialChar && setValid(true)
    },[validLength, hasNumber, upperCase, lowerCase, specialChar])
    return [validLength, hasNumber, upperCase, lowerCase, match, specialChar,valid];
}
