class Map {

    constructor(state, setGlobalState) {
      // initialize properties here
      this.width = 800;
      this.height = 850;
      this.margins = { top: 20, bottom: 20, left: 20, right: 20 };
      this.duration = 1000;
      this.format = d3.format(",." + d3.precisionFixed(1) + "f");
  
      mapboxgl.accessToken = 'pk.eyJ1IjoibmFkeTE5NiIsImEiOiJjazg1enF4dTAwMWowM2dwZGRtM3d6bTR5In0.Isdajp-jzePFbwz97Uqbyg';
      this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/nady196/cka5pc6kx1be81imq0o3e3nvh',
          zoom: 10,
          center:[-73.974, 40.728]
      });
        
         };

    filterBy(grade) {
          map.setFilter('grades-cat', ['==', 'GRADE', grade])
          }
           
  
    draw(state, setGlobalState) {

        console.log("drawing map, "+ this.map.loaded())

        var container = this.map.getCanvasContainer()
        this.svg = d3.select(container).append("svg")
        .attr("width", this.width)
        .attr("height", this.height);


        var layers = ['Black', 'Black Hispanic', 'White Hispanic', 'White', 'Asian / Pacific Islander', 'American Indian/ Alaskan Native', 'Unknown'];
        var colors = ['#cb1010', '#f7b67d', '#eae0d6', '#45239a', '#237b80', '#51d43a', '#6de7ee'];


        var i;
        for (i = 0; i < layers.length; i++) {
          var layer = layers[i];
          var color = colors[i];
          var item = document.createElement('div');
          var key = document.createElement('span');
          key.className = 'legend-key';
          key.style.backgroundColor = color;
        
          var value = document.createElement('span');
          value.innerHTML = layer;
          item.appendChild(key);
          item.appendChild(value);
          legend.appendChild(item);
        }

        // document.getElementById('legend-key.span')
        // .addEventListener('click', function (event) {
        //     console.log(document.getElementsByClassName('legend-key'))
        // });



      //   const filteredData = state.restaurant.filter(function (restaurant){
      //     return restaurant.Latitude != 0 && restaurant.Latitude != "NA"
      // })

      
        // if (this.map.loaded()){ 
        //   this.map.setFilter('grades-cat', ['==', 'GRADE_P', (state.grade_selected['col1']).toUpperCase()])
        //   this.map.setFilter('grades-cat', ['==', 'rating_cat', state.rating_selected['rating_cat']])
        // }
        //  this.map.on('load', function() {
         
        //  });

         

        //  this.map.on('click', 'grades-cat', function(e) {
        //   var coordinates = e.features[0].geometry.coordinates.slice();
        //   var description = e.features[0].properties.rating;
        //   var restaurant = e.features[0].properties.DBA;
        //   var violation = e.features[0].properties['VIOLATION DESCRIPTION'];
        //   var grade = e.features[0].properties.GRADE_P;
           
        //   console.log(coordinates)
        //   console.log(description)
  
        //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //   }


        //   console.log(description)
        //   document.getElementById("map-overlay").innerHTML=
        //     "<h3> Yelp Rating: " +description+ "</h3>"+"<h3>Inspection Grade: "+grade+"</h3> <h3> Restaurant Name: "+restaurant+"</h3>"+"<h4> Violation:"+violation+"/<h4>";
        //   });

        
           
        //   // // Change the cursor to a pointer when the mouse is over the places layer.
        //     this.map.on('mouseenter', 'grades-cat', function() {
        //       map.getCanvas().style.cursor = 'pointer';
        //     });
            
        //   // // Change it back to a pointer when it leaves.
        //     this.map.on('mouseleave', 'grades-cat', function() {
        //         map.getCanvas().style.cursor = '';
        //   });

        
      }
    }

     
  
  export { Map };