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

  const [obstsorten, setObsorten] = useState([
    { name: 'Apfel', alt: 'Äpfel', bild: Apfel, id: 1, status: false },
    {
      name: 'Aprikose',
      alt: 'Aprikosen',
      bild: Aprikose,
      id: 2,
      status: false,
    },
    { name: 'Birne', alt: 'Birnen', bild: Birne, id: 3, status: false },
    {
      name: 'Erdbeere',
      alt: 'Erdbeeren',
      bild: Erdbeere,
      id: 4,
      status: false,
    },
    {
      name: 'Heidelbeere',
      alt: 'Heidelbeeren',
      bild: Heidelbeere,
      id: 5,
      status: false,
    },
    {
      name: 'Himbeere',
      alt: 'Himbeeren',
      bild: Himbeere,
      id: 6,
      status: false,
    },
    {
      name: 'Johannisbeere',
      alt: 'Johannisbeeren',
      bild: Johannisbeere,
      id: 7,
      status: false,
    },
    { name: 'Kirsche', alt: 'Kirschen', bild: Kirsche, id: 8, status: false },
    {
      name: 'Stachelbeere',
      alt: 'Stachelbeeren',
      bild: Stachelbeere,
      id: 9,
      status: false,
    },
    {
      name: 'Weintraube',
      alt: 'Weintrauben',
      bild: Weintraube,
      id: 10,
      status: false,
    },
    { name: 'Pflaume', alt: 'Pflaumen', bild: Pflaume, id: 11, status: false },
    { name: 'Sonstiges', alt: 'Sonstiges', bild: Korb, id: 12, status: false },
  ]);

  const handleClick = (id) => {
    const obst = [...obstsorten];
    const index = obst.findIndex((obst) => obst.id === id);

    obst[index].status = !obst[index].status;
    setObsorten(obst);
  };

  const handleDelete = () => {
    const obst = [...obstsorten];
    obst.forEach((obst) => {
      obst.status = false;
    });
    setObsorten(obst);
  };

  // const handleClick = (e) => {
  //   const id = e.target.closest('button').id;
  //   const index = filter.indexOf(id);

  //   console.log(e.target.closest('button'));

  //   if (index === -1) {
  //     setFilter([...filter, id]);
  //     e.target.closest('button').classList.add('selected');
  //   } else {
  //     filter.splice(index, 1);
  //     setFilter([...filter]);
  //     e.target.closest('button').classList.remove('selected');
  //   }
  // };

  // const handleDelete = () => {
  //   filter.map((filter ) => {filter)

  //   setFilter([]);

  // const collection = document.getElementByClassName('button');

  console.log(filter);

  return (
    <div className="container">
      <div className="cardContainer">
        {obstsorten.map((sorte) => (
          <button
            onClick={() => {
              handleClick(sorte.id);
            }}
            id={sorte.id}
            className={
              sorte.status === true
                ? 'card-2 chooseBtn selected'
                : 'card-2 chooseBtn'
            }
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
        <button className="delete" onClick={() => handleDelete()}>
          Filter löschen
        </button>
      </div>
    </div>
  );
}

export default Filter;
