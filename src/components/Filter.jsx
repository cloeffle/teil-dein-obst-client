import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import '../assets/styles/filter.css';
import Apfel from '../assets/images/icons8-apple-500.png';
import Aprikose from '../assets/images/icons8-apricot-500.png';
import Birne from '../assets/images/icons8-pear-500.png';
import Erdbeere from '../assets/images/icons8-strawberry-500.png';
import Heidelbeere from '../assets/images/icons8-blueberry-500.png';
import Himbeere from '../assets/images/icons8-raspberry-500.png';
import Johannisbeere from '../assets/images/icons8-redcurrant-512.png';
import Kirsche from '../assets/images/icons8-cherry-500.png';
import Stachelbeere from '../assets/images/icons8-gooseberry-500-2.png';
import Weintraube from '../assets/images/icons8-grapes-500.png';
import Pflaume from '../assets/images/icons8-plum-500.png';
import Korb from '../assets/images/fruit basket 500.png';

import { selectedFilterState } from '../atoms/filterAtom';

// use Javascript ES6 Syntax
function Filter(props) {
  const { onSelectFilter } = props;
  const [selectedFilter, setSelectedFilter] =
    useRecoilState(selectedFilterState);

  const [fruitsort, setFruitsort] = useState([
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
    const fruit = [...fruitsort];
    const index = fruit.findIndex((fruit) => fruit.id === id);

    fruit[index].status = !fruit[index].status;
    setFruitsort(fruit);
  };

  const handleDelete = () => {
    const fruit = [...fruitsort];
    fruit.forEach((fruit) => {
      fruit.status = false;
    });
    setFruitsort(fruit);
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
    const fruit = [...fruitsort];
    const filter = fruit.filter((fruit) => fruit.status === true);
    onSelectFilter(filter);
    setSelectedFilter(filter);
  };

  useEffect(() => {
    if (selectedFilter.length > 0) {
      selectedFilter.map((el) => {
        const fruit = [...fruitsort];
        const index = fruit.findIndex((fruit) => fruit.id === el.id);

        fruit[index].status = !fruit[index].status;
        setFruitsort(fruit);
        return null;
      });
    }
  }, [selectedFilter]);

  return (
    <div className="container">
      <div className="cardContainer">
        {fruitsort.map((sort) => (
          <button
            onClick={() => {
              handleClick(sort.id);
            }}
            id={sort.id}
            className={
              sort.status === true
                ? 'card-2 chooseBtn selected'
                : 'card-2 chooseBtn'
            }
            key={crypto.randomUUID()}
            selected={sort.selected}
          >
            <img src={sort.bild} alt={sort.alt} />
            <p>{sort.name}</p>
          </button>
        ))}
      </div>

      <div className="applyFilter">
        <button className="delete" onClick={() => handleDelete()}>
          Filter löschen
        </button>
        <button
          type="submit"
          className="select"
          onClick={(e) => handleApplyFilter(e)}
        >
          Filter anwenden
        </button>
      </div>
    </div>
  );
}

export default Filter;
