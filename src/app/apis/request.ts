const localUrl = 'http://localhost:8080';
const remoteUrl = 'http://121.162.75.86:8080';

export const apiUrl = remoteUrl;

export const requestGet = async(url:string) => {
    const token = ""; //로컬 스토리지에서 가져와야함
    //const UUID = ""; //로컬 스토리지에서 가져와야함
    if(token !== ""){

    }

    try{
        const response:any = await fetch(
            apiUrl + url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                
            }
        )
        .then(res => res.json())
        .then(res => {
            console.log(res + "get Done!");
        });

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

export const requestPost = async (url:string, data:object):Promise<string>  => {
    try{
        let jsonString:string = "";
        console.log("포스트에서.", data);
        const response = await fetch(
            apiUrl + url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
        )
        .then(res => res.json())
        .then(res=>{
            // console.log(res);
            // console.log(JSON.stringify(res));
            
            jsonString = JSON.stringify(res);
        });
        return jsonString;
    }
    catch(err){
        
        if(err instanceof Error){
            console.log(err.message);
            return  err.message;
        }else {
            return '에러발생';
        }
    }
}
