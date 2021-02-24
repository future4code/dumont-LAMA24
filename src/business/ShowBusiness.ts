import { Show, ShowInputDTO } from "./entities/Show";
import { ShowDatabase } from "../data/ShowDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";

export class ShowBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private authenticator: Authenticator,
      private showDatabase: ShowDatabase,
   ) { }

   async createShow(show: ShowInputDTO) {

    if (!show.week_day || !show.start_time || !show.end_time || !show.band_id) {
        throw new CustomError (204, "Please, enter the information required")
    }

    if (show.week_day !== "Friday") {
        throw new CustomError (406, "Please, enter Friday, Saturday or Sunday")
    }

    // if (show.start_time && show.end_time !== 08-23) {
    //     throw new CustomError (406, "Please, enter valid time")
    // }

        const id = this.idGenerator.generate();

        await this.showDatabase.createShow(
         id,
         show.week_day,
         show.start_time,
         show.end_time,
         show.band_id
      );

      const accessToken = this.authenticator.generateToken({
         id,
        });

      return accessToken;
   }
}