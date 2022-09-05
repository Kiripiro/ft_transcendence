import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MatchesHistoryDto } from "./dtos/matchesHistory.dto";
import { MatchesHistoryEntity } from "./matchesHistory.entity";

@Injectable()
export class MatchesHistoryService {
	constructor(
		@InjectRepository(MatchesHistoryEntity)
		private readonly MatchesHistoryRepository: Repository<MatchesHistoryEntity>,
	) {}

	private logger: Logger = new Logger('MatchesHistory');

	public getAllMatchesHistory(): Promise<MatchesHistoryEntity[]> {
		return this.MatchesHistoryRepository.find();
	}

	async getUserMatchesHistory(id: number): Promise<MatchesHistoryEntity[]> {
		const matches = await this.MatchesHistoryRepository.find( {
			where: [
           	 {id_user1: id},
           	 {id_user2: id}
        	]
		});
		
		if (!matches)
			return null; // gestion d erreur needed
		return matches;
	}


	//Recuperer les id des joueurs
	//Inserer les datas de base
	async createMatch(body: any): Promise<MatchesHistoryEntity> {
		this.logger.log(body);
		
		const match = this.MatchesHistoryRepository.save( {
				id_user1: body.id_user1,
				score_u1: body.score_u1,
				id_user2: body.id_user2,
				score_u2: body.score_u2,
				winner_id: body.winner_id
			}
		)
		if (!match)
			return null;
		return match;
	}

}
