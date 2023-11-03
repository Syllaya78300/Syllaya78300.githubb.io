const jourSemaine = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

let adj = new Date();
//Ci permette di avere il giorno attuale in Francese non abbreviato
let options = { weekday: "long" };
let jourActuel = adj.toLocaleDateString("fr-FR", options);

jourActuel = jourActuel.charAt(0).toLocaleUpperCase() + jourActuel.slice(1);
let tabJoursEnOrdre = jourSemaine
  .slice(jourSemaine.indexOf(jourActuel))
  .concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuel)));

console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;
