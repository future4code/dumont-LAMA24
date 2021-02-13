import { Band, BandInputDTO, BandParamsDTO } from "./entities/Bands";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";


export class BandBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private authenticator: Authenticator,
      private bandDatabase: BandDatabase,
   ) { }

   async createBand(band: BandInputDTO) {

    if (!band.name || !band.music_genre || !band.responsible) {
        throw new CustomError (204, "Please, enter the information required")
    }

    const id = this.idGenerator.generate();

        await this.bandDatabase.createBand(
         id,
         band.name,
         band.music_genre,
         band.responsible
      );

      const accessToken = this.authenticator.generateToken({
         id,
        });

      return accessToken;
   }

   async getBandByName(band: BandParamsDTO) {

    const bandFromDB = await this.bandDatabase.getBandByName(band.name);

        if (!bandFromDB) {
            throw new Error ("Invalid band")
        }
        return bandFromDB
    }
 

}
       


