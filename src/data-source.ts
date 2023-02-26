import "dotenv/config";
import "reflect-metadata";
import path from "path"; //Preciso utilizar para não ter problemas ao executar no servidor externo
import { DataSource, DataSourceOptions } from "typeorm";

function dataSourceConfig(): DataSourceOptions {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
    const migrationsPath: string = path.join(__dirname, "./migrations/**.{ts,js}");
    const dbUrl: string | undefined = process.env.DATABASE_URL;

    if (!dbUrl) {
        throw new Error("Env var DATABASE_URL does not exist");
    }
    
    const nodeEnv: string | undefined = process.env.NODE_ENV;

    if (nodeEnv === "test") { //Uma forma ter uma configuração específica para testes, não conectando com a database real
        return {
            type: "sqlite", 
            database: ":memory:", //Vai utilizar apenas a memória do computador para testar
            synchronize: true,
            entities: [entitiesPath]
        }
    }

    return {
        type: "postgres", //Tipo de intermediário sql
        url: dbUrl, //localização da string
        synchronize: false, //Pula as migrations, se deixar true pode perder os dados
        logging: true, //Escreve no console as queries
        entities: [entitiesPath], //Caminho de migrações
        migrations: [migrationsPath] //Caminho de entidades
    }
}

//Não posso esquecer de criar o script "typeorm": "typeorm-ts-node-commonjs" no node modules

export const AppDataSource = new DataSource(dataSourceConfig()); //Seleciono a classe e passo as configurações como parâmetro