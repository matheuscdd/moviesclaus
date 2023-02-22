import { AppDataSource } from "./data-source";
import { app } from "./app";

AppDataSource.initialize().then(() => {
    console.log("Database connected!");
    app.listen(3000, () => {
        console.log("Server is running"); //Coloco o app listen aqui dentro para executar a api apenas se a conexão com o banco foi estabelecida com sucesso
    });
}).catch((error) => {
    console.log(error);
});

