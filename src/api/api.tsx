
const API_BASE_URL = "http://localhost:5000/api"

//Register API
export const registerUser = async (data: any) => {
    try {
            const res = await fetch(`${API_BASE_URL}/auth/register`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
            const result = await res.json();
            console.log("return data in registerUser", result);
            console.log("status", res.status);
            return result;
        }
        catch (err){
            console.error("login fetch error",err);
        }
}

//Login API
export const loginUser = async (data: any) => {
    console.log("data in login user", data);
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });
            const result = await res.json();
            console.log("return data in loginUser", result);
            console.log("status", res.status);
            return result;
            
        }
        catch (err){
            console.error("login fetch error",err);
        }
}

//Organizer get events API
export const getMyEvents = async (token: string) => {
        try {
            const res = await fetch(`${API_BASE_URL}/events/my-events`,{
                method: "GET",
                headers: {Authorization: `Beare ${token}`},
            });
            const result = await res.json();
            console.log("my events data", result);
            return result;
            
        }
        catch (err){
            console.error("my events fetch error",err);
        }
}

// create events
export const createEvent = async (data: any, token: string) => {
    console.log("data in createEvent", data, token);
    
    try{
        const res = await fetch(`${API_BASE_URL}/events/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        console.log("create event");
        return result;
    
    }catch(err){
    console.error("event not created", err);
    
    }
}


