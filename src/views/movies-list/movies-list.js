import  {API_KEY} from "@/config";

export default {
    name: "movies-list",
    data(){
        return{
            bottom: false,
            page:0,
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
            this.$apiRequest("discover/movie", {
                page: page
            }).then(response => {
                this.$set(this, 'movies',  [...this.movies, ...response.data.results]);
                this.$set(this, 'page', response.data.page);
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