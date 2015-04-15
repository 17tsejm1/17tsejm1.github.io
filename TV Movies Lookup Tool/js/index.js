(function($){
 
  // lets make an object
  var Movies = {
    // lets do some stuff
    init: function(){
      this.input = $("#search");
      this.form = $(".movie-form");
      this.results = $(".results");
      this.url = 'http://www.omdbapi.com/';
      this.events();
    },
    
    // throw events in here
    events: function(){
      this.form.on("submit", $.proxy(this.search, this));
      this.results.on("click", ".more-info", this.infoClick);
    },
    
    infoClick: function(e){
      e.preventDefault();
      var title = $(this).html();
      Movies.get(title);
    },
    
    // ajax data
    success: function(data){

      var data = $.parseJSON(data);
      var frag = "";
      // did we get anything?
      if($.isArray(data.Search)){
        // yep
        var results = data.Search;
        console.log(results);
        $.each(results, function(k, v){
          frag += '<div class="result">';
          frag += '<div class="group title"><h2><a class="more-info" href="#">' + v.Title + '</a></h2> ';
          frag += '<a class="imdb" href="http://imdb.com/title/' + v.imdbID + '"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/MV5BMTgyOTIzMTA0NV5BMl5BcG5nXkFtZTcwMTA3MDg2OA@@._V1_.png"></a></div>';
          frag += '</div>';
        });
      } else {
        // didn't get anything
        frag = "<div class='result group'><h2>Sorry.. No movies found, try again!</h2></div>";
      }
      
      this.results.html(frag);
    },
    // coulda loaded handlebars probably instead of fragments.. 
    infoSuccess: function(data){
      var data = $.parseJSON(data);
      var frag = "";
      if(data.Title) {
        frag += '<div class="result">';
        frag += '<div class="group title"><h2>' + data.Title + '</h2>';
        frag += '<a class="imdb" href="http://imdb.com/title/' + data.imdbID + '"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/MV5BMTgyOTIzMTA0NV5BMl5BcG5nXkFtZTcwMTA3MDg2OA@@._V1_.png"></a></div>'
        frag += '<span class="meta"><strong>Release Year:</strong> ' + data.Year + '</span>';
        frag += '<span class="meta"><strong>Rated:</strong> ' + data.Rated + '</span>';
        frag += '<span class="meta"><strong>IMDB Rating:</strong> ' + data.imdbRating + ' based on ' + data.imdbVotes + ' votes.</span>';
        frag += '<span class="meta"><strong>Genre:</strong> ' + data.Genre + '</span>';
        frag += '<p>' + data.Plot + '</p>';
        frag += '</div>';
      } else {
        frag += '<div class="result group"><h2>Something went wrong.. Try again</h2></div>'
      }
      this.results.html(frag);
    },
    
    // search for a movie
    search: function(e){
      e.preventDefault();
      var val = this.input.val();
      this.input.val("");
     $.ajax({
        url: this.url + '?s=' + val,
        success: $.proxy(this.success, this)
      });
    
     
    },
    
    // get a movie 
    get: function(title){
      $.ajax({
        url: this.url + '?plot=full&t=' + title,
        success: $.proxy(this.infoSuccess, this)
      });
    }
    
  };
  
  Movies.init();
  
})(jQuery);