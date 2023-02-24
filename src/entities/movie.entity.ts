import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn 
} from "typeorm"; //Todo o processo de criar a tabela e as colunas será realizado na api mesmo

@Entity("movies") //Transforma a minha classe em uma entidade
export class Movie {

    @PrimaryGeneratedColumn("increment") //Cria a coluna de primary key e dá pra escolher o tipo
    id: number //Para evitar o erro do constructor, precisa colocar no tsconfig strictPropertyInitialization como false

    @Column({ length: 50 , unique: true }) //Length é o cumprimento do varchar
    name: string

    @Column({ type: "text", nullable: true }) //Aqui é o contrário quando eu não quero not null, aí eu coloco que pode ser nulo
    description: string | null | undefined  //As especificações de cada campo serão passadas no parâmetro da função

    @Column({ type: "int" })
    duration: number

    @Column({ type: "int" })
    price: number

}

/*
Para executar uma migração preciso utilizar o comando
yarn typeorm migration:generate src/migrations/createMovie -d src/data-source.ts

Passei para a migração, mas ainda não executei, para fazer isso preciso utilizar o comando
yarn typeorm migration:run -d src/data-source.ts

Para reverter uma migração preciso utilizar
yarn typeorm migration:revert -d src/data-source.ts
*/