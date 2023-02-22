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

    @Column({ length: 50 , unique: true }) //Length é o cumprimento do varchar,
    name: string

    @Column({ nullable: true }) //Aqui é o contrário quando eu não quero not null, aí eu coloco que pode ser nulo
    description: string //As especificações de cada campo serão passadas no parâmetro da função

    @Column()
    duration: number

    @Column()
    price: number

    @CreateDateColumn() //Preenche o campo de criação com a data automática
    createAt: string

    @UpdateDateColumn() //Preenche o campo de atualização com a data automática
    updateAt: string

    @DeleteDateColumn() //Preenche o campo de exclusão soft com a data automática
    deleteAt: string

}