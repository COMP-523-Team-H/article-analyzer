const req = {
    get: (url) => {
        return fetch(url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    },  

    post: (url, body) =>{
        return fetch(url, {
            method: "POST",
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body:JSON.stringify(body)
        })
    }
}

export default req;