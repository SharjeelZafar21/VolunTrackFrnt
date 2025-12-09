
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

//Get Organizer events
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

//Get all events
export const getAllEvents = async ()=>{
    try{
        const res = await fetch(`${API_BASE_URL}/events/all-events`,{
            method: "GET"
        });
        const result = await res.json();
        console.log("all events", result);
        return result;
    }catch(err){
        console.error("all events fetch error",err);
        
    }
}

//Request to join event Join Event
export const requesttoJoinEvent = async (eventId: string)=>{
    const token = localStorage.getItem("token");

    if(!token) return { redirect: true};

    try{
        const res = await fetch(`${API_BASE_URL}/events/request/${eventId}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        const result = await res.json();
        console.log("request to join events", result);
        return result;
        
    }catch(err){
        console.error("event join error",err);
        
    }
}

// get volunteer events
export const getMyRequests = async ()=>{
    const token = localStorage.getItem("token");

    if(!token) return { redirect: true};

    try{
        const res = await fetch(`${API_BASE_URL}/events/requests/myEvents`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const result = await res.json();
        console.log("volunteers events", result);
        return result;
        
    }catch(err){
        console.error("fetching voluteers events error",err);
        
    }
}

//get requests to join event for organizer
export const getOrganizerRequests = async ()=>{
    const token = localStorage.getItem("token");

    if(!token) return { redirect: true};

    try{
        const res = await fetch(`${API_BASE_URL}/events/requests`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const result = await res.json();
        console.log("requests to join event", result);
        return result;
        
    }catch(err){
        console.error("fetching request to join events error",err);
        
    }
}

//approve request
export const approveRequest = async (requestId: String)=>{
    const token = localStorage.getItem("token");

    if(!token) return { redirect: true};

    try{
        const res = await fetch(`${API_BASE_URL}/events/requests/${requestId}/approve`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const result = await res.json();
        console.log("request approved", result);
        return result;
        
    }catch(err){
        console.error("error in approve request",err);
        
    }
}

//reject request
export const rejectRequest = async (requestId: String)=>{
    const token = localStorage.getItem("token");

    if(!token) return { redirect: true};

    try{
        const res = await fetch(`${API_BASE_URL}/events/requests/${requestId}/reject`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const result = await res.json();
        console.log("request rejected", result);
        return result;
        
    }catch(err){
        console.error("error in reject request",err);
        
    }
}

//Completed event
export const completeEvent = async (eventId: String, userId: String, impactScore: Number)=>{
    const token = localStorage.getItem("token");

    if(!token) return { redirect: true};

    try{
        const res = await fetch(`${API_BASE_URL}/events/event/complete`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({eventId, userId, impactScore})
        });
        const result = await res.json();
        console.log("event completed successfuly", result);
        return result;
        
    }catch(err){
        console.error("error in event complete",err);
        
    }
}

//Volunteer profile for organization
export const getVolunteerProfile = async (userId: String) => {
    const token = localStorage.getItem("token");

    if (!token) return { redirect: true };

    try {
        const res = await fetch(`${API_BASE_URL}/events/volunteer/profile/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        console.log("Volunteer profile:", result);
        return result;

    } catch (err) {
        console.error("Error fetching volunteer profile:", err);
        return { error: true };
    }
};

//Volunteer My Profile
export const getVolunteerMyProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) return { redirect: true };

  try {
    const res = await fetch(`${API_BASE_URL}/events/volunteer/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (err) {
    console.error("Error fetching volunteer my profile:", err);
    return { error: true };
  }
};






