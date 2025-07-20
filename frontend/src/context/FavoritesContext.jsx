// context/FavoritesContext.js
import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    const exists = favorites.find((fav) => fav._id === item._id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav._id !== item._id));
    } else {
      setFavorites([...favorites, item]);
    }
    //  hhhhhhhhhhhkkkkk
    // <FavoriteButto product={item} />

  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
