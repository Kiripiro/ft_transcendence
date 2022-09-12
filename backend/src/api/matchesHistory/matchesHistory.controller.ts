import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { MatchesHistoryDto } from "./dtos/matchesHistory.dto";
import { MatchesHistoryEntity } from "./matchesHistory.entity";
import { MatchesHistoryService } from "./matchesHistory.service";

@Controller('matchesHistory')
export class MatchesHistoryController {
  @Inject(MatchesHistoryService)
  private readonly service: MatchesHistoryService;

  @Get()
  public getAllMatchesHistory(): Promise<MatchesHistoryEntity[]> {
    return this.service.getAllMatchesHistory();
  }


  //Changer en methode post
  //Utiliser Req: Express
  //Utiliser le UseGuard('jwt')
  //Recuperer l'id et faire le reste
  @Get('/:id')
  public getUserMatchesHistory(@Param('id', ParseIntPipe) id: number): Promise<MatchesHistoryEntity[]> {
  	return this.service.getUserMatchesHistory(id);
  }

  @Post()
  public createMatch(@Body() body: MatchesHistoryDto): Promise<MatchesHistoryEntity> {
    console.log('body', body)
	  const match = this.service.createMatch(body);
    if(!match)
      return null;
    return match;
  }
}
