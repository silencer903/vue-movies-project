import Multiselect from 'vue-multiselect'
import apiRequest from '../../plugins/api-worker';
export default {
    name: "movies-list",
    components: {
        'multiselect': Multiselect
    },
    data(){
        return{
            bottom: false,
            page:0,
            movies: [],
            overviewLimit: 385,
            genres: [],
            selectedGenres: [
            ],
        }
    },
    created(){
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible();
        });

        this.getGenres();
        this.$set(this, 'selectedGenres',  this.$store.state.selectedGenres);
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
            this.$store.dispatch('getMoviesAsync').then(() => {
                this.$set(this, 'movies',  this.$store.state.movies);
            });
        },
        getGenres(){
            apiRequest("genre/movie/list", {
            }).then(response => {
                this.$set(this, 'genres',  response.data.genres);
                console.log(this.genres);
            });
        },
        setSelectedGenres(){
            this.$store.dispatch('setSelectedGenresAsync',this.selectedGenres).then(() => {
                console.log(this.$store.state);
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