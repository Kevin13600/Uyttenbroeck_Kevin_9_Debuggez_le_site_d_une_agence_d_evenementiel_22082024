import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
 
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  new Date(evtB.date) - new Date(evtA.date)
  );

  const nextCard = () => {
    setTimeout(
      () => setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0),
      5000
    );
  };
  
  useEffect(() => {
    nextCard();
  });
  
 
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
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
                key={`radio-${evt.id || radioIdx}`}
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
