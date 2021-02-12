import { BandInputDTO } from "./entities/Bands";
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

//    async getUserByEmail(user: LoginInputDTO) {

//       const userFromDB = await this.userDatabase.getUserByEmail(user.email);

//         if (!userFromDB) {
//             throw new Error ("Invalid credentials")
//         }

//         if (!user.email || !user.password) {
//             throw new Error ("Enter email and password")
//         }

//       const passwordIsCorrect = await this.hashManager.compare(
//          user.password,
//          userFromDB.password
//       );

//       const accessToken = this.authenticator.generateToken({
//          id: userFromDB.id,
//          role: userFromDB.role
//       });

//       if (!passwordIsCorrect) {
//          throw new CustomError(401, "Invalid password!");
//       }

//       return accessToken;
//    }
}