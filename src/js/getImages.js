export default function getImages(key, page) {
    const axios = require('axios');
    const API_KEY = '27888292-ee7badc36537d4c81fc58ae14';
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${key}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`;
    const pictures = axios.get(url);

    return pictures;
}

// const url = 'https://pixabay.com/api/';
// const API_KEY = '27888292-ee7badc36537d4c81fc58ae14'
// let inputData = 'cat';
// const options = {
//     headers: {
//         key: API_KEY,  
//     },
//     q: inputData,
//     image_type: PushSubscriptionOptions,
//     orientation: 'horizontal',
//     safesearch: true,
// };


// fetch(url, options)
//     .then(response => {
//         if(!response.ok) {
//             throw new Error(response.status);
//         }

//     return response.json();
//     })