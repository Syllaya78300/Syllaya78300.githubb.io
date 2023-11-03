class Meteo extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {

      let div = document.createElement('div')
      let load = document.createElement('p')
      load.innerHTML='Chargement de la page'
      div.appendChild(load)
      let ville=document.createElement('p')
      let heure=document.createElement('p')
      let vent=document.createElement('p')
      let humidite=document.createElement('p')
      let logo=document.createElement('img')
      let error=document.createElement('p')
      
      let url;

      if(this.getAttribute('ville')){
       url = "https://www.prevision-meteo.ch/services/json/"+this.getAttribute('ville')
      } else{
         url ="https://www.prevision-meteo.ch/services/json/Paris"
      }


      let request = new XMLHttpRequest();
      request.open("GET", url);
      request.onload = () => {
        let response = JSON.parse(request.response);
        if(response['errors']){
          div.removeChild(load)
          error.innerHTML="La ville n'existe pas"
          div.appendChild(error)
        }
        else{
        div.removeChild(load)
        console.log(response);
        let p1=response['city_info']['name']
        let p2=response['city_info']['country']
        ville.innerHTML=p1+' '+p2
        heure.innerHTML=response['current_condition']['hour']
        vent.innerHTML=response['current_condition']['wnd_spd']
        humidite.innerHTML=response['current_condition']['humidity']
        logo.src=response['current_condition']['icon']
        }
      };
      request.send();
  

      div.appendChild(ville)
      div.appendChild(heure)
      div.appendChild(vent)
      div.appendChild(humidite)
      div.appendChild(logo)
      this.appendChild(div)
      
    }
  }
  customElements.define("my-meteo", Meteo);