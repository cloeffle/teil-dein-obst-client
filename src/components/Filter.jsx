import React, { useState } from 'react';
import '../assets/styles/filter.css';
import Apfel from '../assets/images/icons8-apple-500.png';
import Aprikose from '../assets/images/icons8-apricot-500.png';
import Birne from '../assets/images/icons8-pear-500.png';
import Erdbeere from '../assets/images/icons8-strawberry-500.png';
import Heidelbeere from '../assets/images/icons8-blueberry-500.png';
import Himbeere from '../assets/images/icons8-raspberry-500.png';
import Johannisbeere from '../assets/images/icons8-redcurrant-512.png';
import Kirsche from '../assets/images/icons8-cherry-500.png';
import Stachelbeere from '../assets/images/icons8-gooseberry-500.png';
import Weintraube from '../assets/images/icons8-grapes-500.png';
import Pflaume from '../assets/images/icons8-plum-500.png';
import Korb from '../assets/images/fruit basket 500.png';

function Filter() {
  const [filter, setFilter] = useState([]);

  const obstsorten = [
    { name: 'Apfel', alt: 'Äpfel', bild: Apfel, id: 1 },
    { name: 'Aprikose', alt: 'Aprikosen', bild: Aprikose, id: 2 },
    { name: 'Birne', alt: 'Birnen', bild: Birne, id: 3 },
    { name: 'Erdbeere', alt: 'Erdbeeren', bild: Erdbeere, id: 4 },
    { name: 'Heidelbeere', alt: 'Heidelbeeren', bild: Heidelbeere, id: 5 },
    { name: 'Himbeere', alt: 'Himbeeren', bild: Himbeere, id: 6 },
    {
      name: 'Johannisbeere',
      alt: 'Johannisbeeren',
      bild: Johannisbeere,
      id: 7,
    },
    { name: 'Kirsche', alt: 'Kirschen', bild: Kirsche, id: 8 },
    { name: 'Stachelbeere', alt: 'Stachelbeeren', bild: Stachelbeere, id: 9 },
    { name: 'Weintraube', alt: 'Weintrauben', bild: Weintraube, id: 10 },
    { name: 'Pflaume', alt: 'Pflaumen', bild: Pflaume, id: 11 },
    { name: 'Sonstiges', alt: 'Sonstiges', bild: Korb, id: 12 },
  ];

  const handleClick = (e) => {
    const id = e.target.closest('button').id;
    const index = filter.indexOf(id);

    console.log(e.target.closest('button'));

    if (index === -1) {
      setFilter([...filter, id]);
      e.target.closest('button').classList.add('selected');
    } else {
      filter.splice(index, 1);
      setFilter([...filter]);
      e.target.closest('button').classList.remove('selected');
    }
  };

  //write a function that removes classList.add('selected') from the Objekt of the useState Filter when the button with the "delete" class is clicked and the setFilter called to delete the array
  const handleDelete = (e) => {
    const id = e.target.closest('button').id;
    const index = filter.indexOf(id);
    console.log(e.target.closest('button'));
    if (index !== -1) {
      filter.splice(index, 1);
      setFilter([...filter]);
      e.target.closest('button').classList.remove('selected');
    }
  };

  console.log(filter);

  return (
    <div className="container">
      <div className="cardContainer">
        {obstsorten.map((sorte) => (
          <button
            onClick={(e) => {
              handleClick(e);
            }}
            id={sorte.id}
            className="card-2 chooseBtn"
            key={sorte.id}
            selected={sorte.selected}
          >
            <img src={sorte.bild} alt={sorte.alt} />
            <p>{sorte.name}</p>
          </button>
        ))}
      </div>

      <div className="applyFilter">
        <button className="select">Filter anwenden</button>
        <button className="delete" onClick={handleDelete}>
          Filter löschen
        </button>
      </div>
    </div>
  );
  // () => setFilter([])
}

export default Filter;
