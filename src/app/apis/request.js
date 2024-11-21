const localUrl = 'http://localhost:8080';
const remoteUrl = 'http://121.162.75.86:8080';

export const apiUrl = localUrl;

export const requestGet = async(url) => {
    const token = ""; //로컬 스토리지에서 가져와야함
    const UUID = ""; //로컬 스토리지에서 가져와야함
    if(token !== ""){

    }

    try{
        const response = await fetch(
            apiUrl + url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                
            }
        );

       console.log(response);
        if(!response.ok) throw new Error("Failed to fetch user1");{
            const data = await response.json();
            return data;
        }
    }
    catch(err){
        if(err instanceof Error){
            console.log(err.message);
        }
    }

}
