import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  async function fetchFavorites() {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id);

    console.log("Favorites Data:", data);
    console.log("Favorites Error:", error);

    if (!error) {
      setFavorites(data || []);
    }
  }

  async function toggleFavorite(propertyId) {
    if (!user) return false;

    const exists = favorites.find(
      (item) => item.property_id === propertyId
    );

    if (exists) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("id", exists.id);

      console.log("Delete Error:", error);

      if (!error) {
        setFavorites((prev) =>
          prev.filter((item) => item.id !== exists.id)
        );
      }

      return false;
    }

    const { data, error } = await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        property_id: propertyId,
      })
      .select()
      .single();

    console.log("Insert Data:", data);
    console.log("Insert Error:", error);

    if (!error) {
      setFavorites((prev) => [...prev, data]);
      return true;
    }

    return false;
  }

  function isFavorite(propertyId) {
    return favorites.some(
      (item) => item.property_id === propertyId
    );
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        fetchFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoriteContext);
}