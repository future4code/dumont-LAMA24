import express, {Express} from 'express';
import cors from 'cors';
import { AddressInfo } from "net";
import { userRouter } from './controller/routes/UserRouter';
import { bandRouter } from "./controller/routes/BandRouter";
import { showRouter } from './controller/routes/ShowRouter';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/band", bandRouter);
app.use("/show", showRouter);


const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});