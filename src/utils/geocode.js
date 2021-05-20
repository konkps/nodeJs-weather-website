const request = require('request') 

 const geocode = (address,callback) => {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    + encodeURIComponent(address)
    +'.json?access_token=pk.eyJ1Ijoia29zdGFza2FwcGFzIiwiYSI6ImNrb3R3ZGpzZTBmZ2Eyb29hejZudDFsa2sifQ.MXmwS2zixBnJMscYt2sf6g&limit=1'

    request({url:url,json:true},(error,response) => {
       if(error){
          callback('Unable to Connect', undefined)
      }else if (response.body.features.length === 0){
          callback("unable to find Location", undefined)
      }else{
          latLng = response.body.features[0].center
          callback(undefined, {
              latitude : latLng[1] ,
              longitude : latLng[0],
              location : response.body.features[0].place_name
           })
      }
   })
}
module.exports = geocode