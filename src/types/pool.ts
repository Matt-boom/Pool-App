export interface Team {
  id: string;
  name: string;
  leagueLevel: string;
  totalPoints: number;
}

export interface Player {
  id: string;
  name: string;
  club: string;
  mostValuablePoints: number;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  homeTeamFrames: number;
  awayTeamFrames: number;
}