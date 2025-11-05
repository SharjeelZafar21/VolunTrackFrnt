const API_BASE_URL = "http://localhost:5000/api"

export const registerUser = async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    return res.json();
}

export const loginUser = async (data: { email: string; password: string; }) => {
    console.log("data in login user", data);
    
    const res = await fetch(`${API_BASE_URL}/auth/login`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    console.log("return data in loginUser", res.json);
    
    return res.json();
}

