import { jwtDecode } from "jwt-decode";

// handy utility tool to decode the token
// made this so we don't need to repeat ourselves
// DRY code
export const decodeToken=(token)=>{
    try{
        return jwtDecode(token);
    }
    catch(err){
        console.error("failed to decode token",err);
        return null;
    }
};