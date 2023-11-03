import tabJoursEnOrdre from "./Utilitaire/gestionTemps.js";

console.log(tabJoursEnOrdre);

const CLEAPI = "e51b232f0c6b9d006d797310f4bc5ea3";
let resultatApi;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");
const heure = document.querySelectorAll(".heure-nom-prevision");
const tempPourH = document.querySelectorAll(".heure-prevision-valeur");
const jourDiv = document.querySelectorAll(".jour-prevision-nom");
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp");
const imgIcone = document.querySelector(".logo-meteo");
const chargementContainer = document.querySelector(".overlay-icone-chargement");

//Ottengo la geolocalizzazione dal browser
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      //   console.log(position);

      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      AppelAPI(long, lat);
    },
    () => {
      alert(
        `Vous avez refusé la géolocalisation, l'application ne peux pas fonctionner, veilleuz  l'activer.!`
      );
    }
  );
}

//FUNCTIONS

function AppelAPI(long, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      resultatApi = data;
      //Con innerText inserisco del testo mentre con innerHtml inserisco del codice HTML
      temps.innerText = resultatApi.current.weather[0].description;
      temperature.innerText = `${Math.trunc(resultatApi.current.temp)}°`;
      localisation.innerText = resultatApi.timezone;

      //Le ore ogni 3 ore
      let heureActuelle = new Date().getHours();
      console.log(heureActuelle);

      for (let i = 0; i < heure.length; i++) {
        let heureIncr = heureActuelle + i * 3;

        if (heureIncr > 24) {
          heure[i].innerText = `${heureIncr - 24} h`;
        } else if (heureIncr === 24) {
          heure[i].innerText = `00 h`;
        } else {
          heure[i].innerText = `${heureIncr} h`;
        }
      }

      //Le temperature ogni 3 ore
      for (let j = 0; j < tempPourH.length; j++) {
        tempPourH[j].innerText = `${Math.trunc(
          resultatApi.hourly[j * 3].temp
        )}°`;
      }

      // Le prime tre lettere di giorni
      for (let k = 0; k < tabJoursEnOrdre.length; k++) {
        jourDiv[k].innerText = tabJoursEnOrdre[k].slice(0, 3);
      }

      // Temperatura al  giorno
      for (let m = 0; m < 7; m++) {
        tempJoursDiv[m].innerText = `${Math.trunc(
          resultatApi.daily[m + 1].temp.day
        )}°`;
      }

      // Icone dinamiche
      if (heureActuelle >= 6 && heureActuelle < 21) {
        imgIcone.src = `ressources/jour/${resultatApi.current.weather[0].icon}.svg`;
      } else {
        imgIcone.src = `ressources/nuit/${resultatApi.current.weather[0].icon}.svg`;
      }

      chargementContainer.classList.add("disparition");
    });
}
