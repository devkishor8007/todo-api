import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Todo {
    @PrimaryKey()
    id: number;

    @Property()
    name: string;

    @Property()
    desc: string;

    @Property()
    price: number;

    @Property({ nullable: true })
    fav?: string;

    @Property({ default: false })
    isDelete: boolean;
}
