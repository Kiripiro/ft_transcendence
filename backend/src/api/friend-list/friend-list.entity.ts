import { Index, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('friendList')
export class FriendListEntity {
	@PrimaryGeneratedColumn({type: 'bigint'})
	public id: number;

	@Column({type: 'int'})
	public id_user1: number;

	@Column({type: 'int'})
	public id_user2: number;
}