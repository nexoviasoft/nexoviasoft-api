import { Injectable } from '@nestjs/common';
import { CreateOurTeamDto } from './dto/create-our-team.dto';
import { UpdateOurTeamDto } from './dto/update-our-team.dto';

@Injectable()
export class OurTeamService {
  create(createOurTeamDto: CreateOurTeamDto) {
    return 'This action adds a new ourTeam';
  }

  findAll() {
    return `This action returns all ourTeam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ourTeam`;
  }

  update(id: number, updateOurTeamDto: UpdateOurTeamDto) {
    return `This action updates a #${id} ourTeam`;
  }

  remove(id: number) {
    return `This action removes a #${id} ourTeam`;
  }
}
