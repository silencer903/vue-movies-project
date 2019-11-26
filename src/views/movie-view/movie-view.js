import moment from "moment";

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
                'append_to_response': 'videos'
            }).then(response => {
                this.$set(this, 'movie', response.data);
                console.log(this.movie);
            });

        }
    },
    created(){
        this.getMovie();
    },
    filters:{
        GenresToString: function (genres) {
            if(genres){
                return genres.map( function (genre){
                    return genre.name;
                }).join(",");
            }else{
                return "Жанры не найдены";
            }
        },
        DateFormater(dateString, format="DD.MM.Y"){
            if(dateString){
                return moment(dateString, 'YYYY-MM-DD').format(format);
            }else{
                return dateString;
            }
        }
    }

}