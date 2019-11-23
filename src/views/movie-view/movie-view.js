
export default {
    name: "movie-view",
    data(){
        return {
            movie: {
                videos: [],
            },
        }
    },
    methods:{
        getMovie(){
            let id=this.$route.params.id;
            this.$apiRequest("movie/"+id, {
            }).then(response => {
                this.$set(this, 'movie', response.data);
                console.log(this.movie);
                this.$apiRequest("movie/"+id+"/videos", {}).then(response => {
                    this.$set(this.movie, 'videos', response.data.results);
                    console.log(this.movie.videos);
                });
            });

        }
    },
    created(){
        this.getMovie();
    }

}