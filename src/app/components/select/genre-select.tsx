import { GenreService } from "@/app/services/GenreService";
import React, { useEffect } from "react";
import Select from "react-tailwindcss-select";
import type { Option, Options } from "react-tailwindcss-select/dist/components/type";

interface GenreSelectProps {
  selectGenreId: Option[];
  setSelectGenreId: (value: Option[]) => void;
  isDisabeld?: boolean;
  showNumberOfBooks?: boolean;
}

export const GenreSelect = ({selectGenreId, setSelectGenreId, isDisabeld: isDisabled, showNumberOfBooks} : GenreSelectProps) => {
  const genreService = new GenreService();
  const [genres, setGenres] = React.useState<Options>([]);

  useEffect(() => {
    genreService.getAllGenres({page: 1, pageSize: 1000, genreId: 0, SearchName: ""}).then((data) => {
      const formattedGenres = data.genres.map((genre) => ({
        value: genre.id.toString(),
        label: showNumberOfBooks ? genre.name + " (" + genre.numberBook + ")" : genre.name,
    }));
    setGenres(formattedGenres);
    });
  }, [])

  const handlerSelectGenre = (value : any) => {
    setSelectGenreId(value);
    console.log(value);
  }

  return (
    <Select
      isDisabled={isDisabled}
      isMultiple={true}
      isClearable={true}
      primaryColor={"blue"}
      options={genres}
      value={selectGenreId}
      onChange={handlerSelectGenre}
    />
  );
};