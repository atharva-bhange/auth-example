import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	BaseEntity,
	BeforeInsert,
} from "typeorm";
import { hashSync } from "bcryptjs";
import { IsEmail, Length } from "class-validator";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@IsEmail()
	@Column()
	email: string;

	@Length(8)
	@Column()
	password: string;

	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, 12);
	}
}
