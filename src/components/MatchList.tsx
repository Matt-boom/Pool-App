import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Match } from '@/types/pool';

interface MatchListProps {
  loading: boolean;
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

export function MatchList({ loading, matches, onSelectMatch }: MatchListProps) {
  return (
    <Card className="md:col-span-2 lg:col-span-1">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-green-500" />
          <CardTitle>Recent Matches</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-full h-12" />
            ))}
          </div>
        ) : matches.length > 0 ? (
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>{new Date(match.date).toLocaleDateString()}</span>
                  <Button
                    variant="outline"
                    onClick={() => onSelectMatch(match)}
                  >
                    Update Result
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{match.homeTeam.name}</span>
                  <span>vs</span>
                  <span className="font-medium">{match.awayTeam.name}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No matches scheduled</p>
        )}
      </CardContent>
    </Card>
  );
}