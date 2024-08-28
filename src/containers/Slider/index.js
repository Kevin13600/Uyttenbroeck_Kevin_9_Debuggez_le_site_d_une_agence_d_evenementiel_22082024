import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
 
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  new Date(evtB.date) - new Date(evtA.date)
    // Cette modification assure que les événements les plus récents apparaissent en premier.
  );

  const nextCard = () => {
    setTimeout(
      // () => setIndex(index < byDateDesc.length ? index + 1 : 0),
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  
  /* useEffect(() => {
    nextCard();
  });
  */
  useEffect(() => {
    const timer = nextCard();
    return () => clearTimeout(timer);
  }, [index]);

  // Optimisation de l'effet useEffect : L'effet a été modifié pour nettoyer le timer et dépendre de l'index
  // Cela permet d'éviter des appels inutiles et de nettoyer correctement le timer.
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((evt, radioIdx) => (
              <input
                key={`radio-${evt.id}`}
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// <div key={event.id}> Ajout d'une clé unique pour chaque élément de la liste principale
// key={`radio-${evt.id}`} Modification de la clé des boutons radio : Au lieu d'utiliser l'index du tableau (qui est déconseillé), nous utilisons maintenant l'ID unique de chaque événement pour générer la clé 
// {byDateDesc.map((evt, radioIdx) => ( ... ))} Changement de la variable dans la fonction map : Nous avons remplacé _ par evt pour avoir accès à l'objet événement complet et pouvoir utiliser son ID

export default Slider;
