import AuthorService from "@/app/services/AuthorService";
import React, { useEffect } from "react";
import Select from "react-tailwindcss-select";
import type { Option, Options } from "react-tailwindcss-select/dist/components/type";

interface AuthorSelectProps {
  selectAuthorId: Option[];
  setSelectAuthorId: (value: Option[]) => void;
  isDisabled?: boolean;
  showNumberOfBooks?: boolean;
}

export const AuthorSelect = ({ selectAuthorId, setSelectAuthorId, isDisabled, showNumberOfBooks }: AuthorSelectProps) => {
  const authorService = new AuthorService();
  const [authors, setAuthors] = React.useState<Options>([]);

  useEffect(() => {
    authorService.listAuthors({ page: 1, pageSize: 1000, searchName: "" }).then((data) => {
      const formattedAuthors = data.authors.map((author) => ({
        value: author.id.toString(),
        label: showNumberOfBooks ? author.name + " (" + author.numberOfBooks + ")" : author.name,
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
    primaryColor="blue"
      isDisabled={isDisabled}
      isMultiple={true}
      isClearable={true}
      options={authors}
      value={selectAuthorId}
      onChange={handlerSelectAuthor}
    />
  );
};