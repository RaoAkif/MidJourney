import axiosBase from 'axios';

const axios = axiosBase.create({
    baseURL: 'https://directus-production-9585.up.railway.app/items',
    headers: {'Content-Type': 'application/json'}
  });

export const getProfile = async () =>{
    try {
        const res = await axios.get("/profile/1")
        return res.data.data
        
    } catch (error) {
        return
    }
}