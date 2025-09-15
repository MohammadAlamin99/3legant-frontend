
const baseUrl = "https://3legant-backend-zeta.vercel.app/api/v1";

export const getBlog = async (page:number=1, limit:number=3)=>{
    try {
        const res = await fetch(`${baseUrl}/blog?page=${page}&limit=${limit}`, {
            method:"GET",
            headers:{
                "content-type":"application/json"
            },
            next:{
                revalidate:300
            }
        });
        const data = await res.json();
        return data.data;
    } catch (e) {
        return e;
    }
} 