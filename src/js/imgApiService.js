export default class ImgApiService {
    constructor() {
        this.serchQuery = '';
        this.page = 1;

    }

    async getImages() {
        const axios = require('axios');
        const API_KEY = '27888292-ee7badc36537d4c81fc58ae14';
        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.serchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
        const pictures = await axios.get(url);
        this.incrementPage()
    
        return pictures;
    }

    incrementPage() {
        this.page +=1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.serchQuery;
    }

    set query(newQuery) {
        this.serchQuery = newQuery;
    }
}