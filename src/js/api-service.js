export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.key = '33939890-a3090e3aada617e55ee2e122d';
        this.page = 1;
    };

    fetchPhoto() {
        const options = {
            
        };

        const url = `https://pixabay.com/api/?key=${this.key}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

        return fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.page += 1;

                return data.hits;

            });
    };

    resetPage() {
        this.page = 1;
    };
    
    get query() {
        return this.searchQuery;
    };
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    };

}