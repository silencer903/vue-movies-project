import  {API_KEY} from "../../config";
import http from "axios"

export default {

    name: "movies-list",
    data(){
        return{
            bottom: false,
            page:0,
            language:"ru-RU",
            movies: [],
            overviewLimit: 385,
        }
    },
    created(){
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible();
        });
        this.getMovies();
    },
    methods:{
        bottomVisible() {
            const scrollY = window.scrollY;
            const visible = document.documentElement.clientHeight;
            const pageHeight = document.documentElement.scrollHeight;
            const bottomOfPage = visible + scrollY >= pageHeight;

            return bottomOfPage || pageHeight < visible;
        },
        getMovies(){
            let page = this.page + 1;
            http.get('https://api.themoviedb.org/3/discover/movie?api_key='+API_KEY+'&language='+this.language+'&page='+page)
                .then(response => {
                    this.movies = [...this.movies, ...response.data.results];
                    this.page = response.data.page;
                    console.log(this.movies);
                });
        }
    },
    watch: {
        bottom(bottom) {
            if (bottom) {
                this.getMovies();
            }
        }
    },
    filters:{
        truncateString: function (value, overviewLimit) {
            if(value.length > overviewLimit){
                return value.substring(0,overviewLimit)+"...";
            }else{
                return value;
            }
        }
    },

}