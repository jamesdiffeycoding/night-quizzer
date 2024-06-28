export default async function quizApi(table, method, id, postOrPatchInfo) {
    let url = `https://quizzer-backend-api.onrender.com/api/quiz/${id ? id : ""}`;
    // DEV VERSION
    // let url = `http://localhost:3001/api/quiz/${id ? id : ""}`;

    let request = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Adjust the request body for specific methods if needed
    if (method === 'POST' || method === 'PATCH') {
        request.body = JSON.stringify({ data: postOrPatchInfo });
    }
    try {
        const response = await fetch(url, request);
        if (response.ok) {
            console.log(`${method} success`);
            const data = await response.json();
            console.log("Fetch returned data below----------------------------");
            console.log(data);
        } else {
            console.error(`Failed to ${method} quiz`);
        }
    } catch (error) {
        console.error('Error updating quiz:', error);
    }
}     
