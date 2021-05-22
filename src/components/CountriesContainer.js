import React, { useState, useEffect, useRef } from "react";
import CountryCard from "./CountryCard";

// Calls
import { getAllCountries } from "../calls/countries";

import "./CountriesContainer.css";

const CountriesContainer = () => {
  const [countries, setCountries] = useState([]);
  // Afin d'écrire correctement le composant, nous devons également vérifier si le composant est toujours monté. Par conséquent,
  // nous déclarons tout d'abord une nouvelle variable componentIsMounted. Il utilise le hook useRef, qui
  // retourne un objet de référence mutable dont la propriété .current est initialisée à l'argument passé (initialValue).
  const componentIsMounted = useRef(true);

  useEffect(() => {
    getAllCountries()
      .then((response) => {
        if (componentIsMounted.current) {
          setCountries(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  return (
    <div className="countries-container">
      {countries.map((country) => {
        return <CountryCard key={country.numericCode} country={country} />;
      })}
    </div>
  );
};

export default CountriesContainer;
