import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  
  
  /* const filteredEvents = (
    (!type
      ? data?.events
      : data?.events) || []
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  }); 
  
  - Cette logique ne filtre pas réellement les événements en fonction du type sélectionné. Elle retourne toujours tous les événements, qu'un type soit sélectionné ou non.
  - De plus, le filtrage par pagination est effectué sur l'ensemble des événements, pas sur les événements déjà filtrés par type.
  
  */
  
 const filteredEvents = (data?.events || [])
  .filter(event => {
    if (type === "Toutes" || !type) {
      return true; // Inclure tous les événements pour "Toutes" ou si aucun type n'est sélectionné
    }
    return event.type === type; // Filtrer par type pour les autres options
  })
  .sort((a, b) => {
    if (type === "Toutes" || !type) {
      // Tri numérique par ID pour "Toutes"
      return a.id - b.id;
    }
    return 0; // Pas de tri supplémentaire pour les autres types
  })
  .filter((event, index) => {
    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    return index >= startIndex && index < endIndex;
  });

  /* 
  
  - Cette correction filtrera d'abord les événements par type (si un type est sélectionné), puis appliquera la pagination sur le résultat.

  -  Autres observations :

  - Le composant gère correctement les états de chargement et d'erreur.
  - La pagination est mise en place, mais le calcul de pageNumber devrait être ajusté pour refléter le nombre correct de pages après le filtrage par type.
  
  */
  
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
