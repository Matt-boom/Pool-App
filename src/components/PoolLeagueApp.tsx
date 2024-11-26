import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { LeagueTable } from './LeagueTable';
import { MVPRankings } from './MVPRankings';
import { MatchList } from './MatchList';
import type { Team, Player, Match } from '@/types/pool';
import { mockDataService } from '@/services/mockData';

const PoolLeagueApp: React.FC = () => {
  const [currentLeague, setCurrentLeague] = useState('PREMIER');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [homeFrames, setHomeFrames] = useState(0);
  const [awayFrames, setAwayFrames] = useState(0);
  const { toast } = useToast();

  const leagues = ['PREMIER', 'CHAMPIONSHIP', 'DIVISION_ONE', 'DIVISION_TWO'];
  const [leagueTable, setLeagueTable] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [mostValuablePlayers, setMostValuablePlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await mockDataService.getLeagueData(currentLeague);
        setLeagueTable(data.teams);
        setMatches(data.matches);
        setMostValuablePlayers(data.players);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch league data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentLeague, toast]);

  const submitMatchResult = async (matchId: string, homeFrames: number, awayFrames: number) => {
    try {
      const success = await mockDataService.submitMatchResult(matchId, homeFrames, awayFrames);
      
      if (!success) throw new Error('Failed to submit match result');
      
      toast({
        title: 'Success',
        description: 'Match result submitted successfully!',
      });
      setSelectedMatch(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit match result. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Pool League Management</h1>
        <Select value={currentLeague} onValueChange={setCurrentLeague}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select League" />
          </SelectTrigger>
          <SelectContent>
            {leagues.map(league => (
              <SelectItem key={league} value={league}>
                {league.replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LeagueTable loading={loading} leagueTable={leagueTable} />
        <MVPRankings loading={loading} players={mostValuablePlayers} />
        <MatchList loading={loading} matches={matches} onSelectMatch={setSelectedMatch} />
      </div>

      {selectedMatch && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Submit Match Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {selectedMatch.homeTeam.name} Frames
                </label>
                <Input
                  type="number"
                  min="0"
                  value={homeFrames}
                  onChange={(e) => setHomeFrames(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {selectedMatch.awayTeam.name} Frames
                </label>
                <Input
                  type="number"
                  min="0"
                  value={awayFrames}
                  onChange={(e) => setAwayFrames(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedMatch(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => submitMatchResult(selectedMatch.id, homeFrames, awayFrames)}
              >
                Submit Result
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PoolLeagueApp;