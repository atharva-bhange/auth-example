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
	@Column({ unique: true })
	email: string;

	@Length(8)
	@Column({ nullable: true })
	password: string;

	@BeforeInsert()
	hashPassword() {
		if (this.password) this.password = hashSync(this.password, 12);
	}
}
