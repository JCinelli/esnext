let favoriteCityId = "rome";
console.log(favoriteCityId);
console.log("");

favoriteCityId = "paris";
console.log(favoriteCityId);
console.log("");

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];
console.log(citiesId);
console.log("");

citiesId.push("tokyo");
console.log(citiesId);
console.log("");

function getWeather(cityId) {
    let city = cityId.toUpperCase();
    let temperature = 20;

    return { city, temperature };
}

const weather = getWeather(favoriteCityId);

console.log(weather);
console.log("");

const { city, temperature } = weather;

console.log(city);
console.log(temperature);
console.log("");

const [parisId, nycId, ...othersCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);
console.log("");

class Trip {
    constructor(id, name, imgUrl) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
    }

    toString() {
        return "Trip [" + this.id + ', ' + this.name + ', ' + this.imgUrl + ', ' + this._price + "$]";
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice;
    }

    static getDefaultTrip() {
        return new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg");
    }
}

const parisTrip = new Trip("paris", "Paris", "img/paris.jpg");

console.log(parisTrip);
console.log(parisTrip.name);
console.log("");

console.log(parisTrip.toString());
console.log("");

parisTrip._price = 100;

console.log(parisTrip.toString());
console.log("");

const defaultTrip = Trip.getDefaultTrip();

console.log(defaultTrip.toString());
console.log("");

class FreeTrip extends Trip {
    constructor(id, name, imgUrl, price) {
        super(id, name, imgUrl);
        this.price = price || 0;
    }

    toString() {
        return "Free" + super.toString();
    }
}

const freeTrip = new FreeTrip("nantes", "Nantes", "img/nantes.jpg");

console.log(freeTrip.toString());
console.log("");

class TripService {
    constructor() {
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }

    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                this.trips.forEach(t => {
                    if (t.name === tripName) {
                        resolve(t);
                    }
                });

                reject("No trip with name '" + tripName + "'");

            }, 2000)
        });
    }
}

class PriceService {
    constructor() {
        this.map = new Map();
        this.map.set("paris", 100);
        this.map.set("rio-de-janeiro", 800);
        this.map.set("nantes");
    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                
                this.map.forEach(t =>{
                    if (this.map.get(tripId)) {
                        resolve(this.map.get(tripId))    
                    }
                })

                reject("No price found for id '" + tripId + "'")

            }, 2000)
        });
    }
}

const tripService = new TripService();

const priceService = new PriceService();

tripService.findByName("Paris")
    .then(value => console.log("Find by name : Trip found => " + value))
    .catch(err => console.log("Find by name : " + err))

tripService.findByName("Toulouse")
    .then(value => console.log("Find by name : Trip found => " + value))
    .catch(err => console.log("Find by name : Error => " + err))

tripService.findByName("Rio de Janeiro")
    .then(trip => priceService.findPriceByTripId(trip.id)
                    .then(prix => console.log("Find price by trip Id : Price found => " + prix))
                    .catch(err => console.log("Find price by trip Id : Error => " + err)))
    .catch(err => console.log("Find by name : " + err))

tripService.findByName("Nantes")
    .then(trip => priceService.findPriceByTripId(trip.id)
                    .then(prix => console.log("Find price by trip Id : Price found => " + prix))
                    .catch(err => console.log("Find price by trip Id : Error => " + err)))
    .catch(err => console.log("Find by name : " + err))

