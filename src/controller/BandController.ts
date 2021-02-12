import { Request, Response } from "express";
import { BandInputDTO } from "../business/entities/Bands";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { BandDatabase } from "../data/BandDatabase";
import { BandBusiness} from "../business/BandBusiness";

const bandBusiness = new BandBusiness(
    new IdGenerator(),
    new Authenticator(),
    new BandDatabase()
 );

 export class BandController {
    async signupBand(req: Request, res: Response) {
       try {
 
          const input: BandInputDTO = {
             name: req.body.name,
             music_genre: req.body.music_genre,
             responsible: req.body.responsible
          }
 
          const token = await bandBusiness.createBand(input);
 
          res.status(200).send({ token });
 
       } catch (error) {
          res
             .status(error.statusCode || 400)
             .send({ error: error.message });
       }
    }
 
//     async login(req: Request, res: Response) {
 
//        try {
 
//           const loginData: LoginInputDTO = {
//              email: req.body.email,
//              password: req.body.password
//           };
 
//           const token = await userBusiness.getUserByEmail(loginData);
 
//           res.status(200).send({ token });
 
//        } catch (error) {
//           res
//              .status(error.statusCode || 400)
//              .send({ error: error.message });
//        }
//     }
 
 }