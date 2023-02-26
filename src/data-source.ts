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

    if (nodeEnv === "test") { 
        return {
            type: "sqlite", 
            database: ":memory:", 
            synchronize: true,
            entities: [entitiesPath]
        }
    }

    return {
        type: "postgres", 
        url: dbUrl, 
        synchronize: false, 
        logging: true,
        entities: [entitiesPath], 
        migrations: [migrationsPath] 
    }
}



export const AppDataSource = new DataSource(dataSourceConfig()); 