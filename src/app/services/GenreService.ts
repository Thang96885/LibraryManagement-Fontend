import { it } from "node:test";
import { CreateGenreRequest, ListGenreRecord, ListGenreRequest, ListGenreResult, UpdateGenreRequest } from "../models/genre-model";
import { Base_URL } from "./BaseUrl";
import { headers } from "next/headers";

const API_URL = Base_URL + "/api/Genre";

export class GenreService {


  async getAllGenres(request: ListGenreRequest) : Promise<ListGenreResult> {

    var param = new URLSearchParams(request as any).toString();
    const response = await fetch(API_URL + "/list?" + param, {method: "GET"});
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      return new ListGenreResult(data.genres, data.numberGenres);
    } else {
      throw new Error("Failed to get genres");
    }
  }

  async UpdateGenre(request: UpdateGenreRequest) : Promise<boolean>
  {
    const response = await fetch(API_URL + "/update", {method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(request)});

    console.log(response);

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }

  async CreateGenre(request: CreateGenreRequest) : Promise<boolean>
  {
    const response = await fetch(API_URL + "/add", {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(request)});
    console.log(response);
    if(response.ok)
      return true;
    
    return false;
  }

  async DeleteGenre(id: number) : Promise<boolean>
  {
     const response = await fetch(API_URL + "/delete", {method: "DELETE", body: JSON.stringify({id: id}), headers: { "Content-Type": "application/json" }});
      console.log(response);
      if(response.ok)
        return true;
      return false;
  }
}

