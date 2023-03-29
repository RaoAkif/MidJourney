export const getProfile = async () =>{
    const res = await fetch("https://directus-production-9585.up.railway.app/items/profile/1",{
        headers:{
            'Content-Type': 'application/json',
        }
    })
    const data = await res.json()
     console.log(data[0])
   return data
}