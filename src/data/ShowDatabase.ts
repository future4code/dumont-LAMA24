import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../business/error/CustomError";
import { Show } from "../business/entities/Show";

export class ShowDatabase extends BaseDatabase {

    private static TABLE_NAME = "NOME_TABELA_SHOWS";
 
    private static toShowModel(show: Show): Show {
       return new Show(
        show.id,
        show.week_day,
        show.start_time,
        show.end_time,
        show.band_id
        );
    }
 
    public async createShow(
       id: string,
       week_day: string,
       start_time: number,
       end_time: number,
       band_id: string
       
    ): Promise<void> {
       try {
          await BaseDatabase.connection
             .insert({
                id,
                week_day,
                start_time,
                end_time,
                band_id
            })
             .into(ShowDatabase.TABLE_NAME);
       } catch (error) {
           console.log(error)
          throw new CustomError(500, "An unexpected error ocurred");
       }
    }
}