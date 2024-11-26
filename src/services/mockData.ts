import { Team, Player, Match } from '@/types/pool';

export const mockTeams: Team[] = [
  { id: '1', name: 'Cue Masters', leagueLevel: 'PREMIER', totalPoints: 45 },
  { id: '2', name: 'Break Kings', leagueLevel: 'PREMIER', totalPoints: 42 },
  { id: '3', name: 'Pocket Pros', leagueLevel: 'PREMIER', totalPoints: 38 },
  { id: '4', name: 'Chalk Champions', leagueLevel: 'PREMIER', totalPoints: 35 },
];

export const mockPlayers: Player[] = [
  { id: '1', name: 'John Smith', club: 'Cue Masters', mostValuablePoints: 120 },
  { id: '2', name: 'Sarah Johnson', club: 'Break Kings', mostValuablePoints: 115 },
  { id: '3', name: 'Mike Wilson', club: 'Pocket Pros', mostValuablePoints: 98 },
  { id: '4', name: 'Emma Davis', club: 'Chalk Champions', mostValuablePoints: 95 },
];

export const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: mockTeams[0],
    awayTeam: mockTeams[1],
    date: '2024-03-30',
    homeTeamFrames: 6,
    awayTeamFrames: 4,
  },
  {
    id: '2',
    homeTeam: mockTeams[2],
    awayTeam: mockTeams[3],
    date: '2024-04-02',
    homeTeamFrames: 5,
    awayTeamFrames: 5,
  },
];

export const mockDataService = {
  getLeagueData: (league: string) => {
    return new Promise<{
      teams: Team[];
      players: Player[];
      matches: Match[];
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          teams: mockTeams.filter(team => team.leagueLevel === league),
          players: mockPlayers,
          matches: mockMatches,
        });
      }, 1000);
    });
  },

  submitMatchResult: (matchId: string, homeFrames: number, awayFrames: number) => {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  },
};