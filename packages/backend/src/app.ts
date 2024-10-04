import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import AppRouter from './routes';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

const corsOptions: cors.CorsOptions = {
	origin: 'http://localhost:5173', 
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
	allowedHeaders: ['Content-Type', 'Authorization'], 
	credentials: true, 
};

app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello Node!');
});

router.init();

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
