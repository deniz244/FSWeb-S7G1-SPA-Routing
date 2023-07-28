import React, { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
          console.log("response", response);
          console.log("movies", response.data);
          setMovieList(response.data);
          console.log("movieList", movieList);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (movObj) => {
    //console.log("App.js: KaydedilenlerListesineEkle", id);
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    const findSaved = saved.filter((m) => m.id === movObj.id);

    if (findSaved.length > 0) {
      console.log("Zaten kaydedilmiş");
    } else {
      setSaved([...saved, movObj]);
    }
  };

  return (
    <Router>
      <div>
        <KaydedilenlerListesi list={saved} />

        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/filmler/:id">
              <Film save={KaydedilenlerListesineEkle} />
            </Route>
            <Route path="/">
              <FilmListesi movies={movieList} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
