import AuthorService from "@/app/services/AuthorService";
import React, { useEffect } from "react";
import Select from "react-tailwindcss-select";
import type { Option, Options } from "react-tailwindcss-select/dist/components/type";

interface AuthorSelectProps {
  selectAuthorId: Option[];
  setSelectAuthorId: (value: Option[]) => void;
  isDisabled?: boolean;
}

export const AuthorSelect = ({ selectAuthorId, setSelectAuthorId, isDisabled }: AuthorSelectProps) => {
  const authorService = new AuthorService();
  const [authors, setAuthors] = React.useState<Options>([]);

  useEffect(() => {
    authorService.listAuthors({ page: 1, pageSize: 1000, searchName: "" }).then((data) => {
      const formattedAuthors = data.authors.map((author) => ({
        value: author.id.toString(),
        label: author.name + " (" + author.numberOfBooks + ")",
      }));
      setAuthors(formattedAuthors);
    });
  }, []);

  const handlerSelectAuthor = (value: any) => {
    setSelectAuthorId(value);
    console.log(value);
  };

  return (
    <Select
    formatOptionLabel={data => (
      <li
          className={`block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
              !data.isSelected
                  ? `text-white bg-blue-500`
                  : `bg-blue-100 text-blue-500`
          }`}
      >
          // data represents each option in the list
          {data.label}
      </li>
  )}
      primaryColor={"indigo"}
      isDisabled={isDisabled}
      isMultiple={true}
      isClearable={true}
      options={authors}
      value={selectAuthorId}
      onChange={handlerSelectAuthor}
    />
  );
};