import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Trophy } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Team } from '@/types/pool';

interface LeagueTableProps {
  loading: boolean;
  leagueTable: Team[];
}

export function LeagueTable({ loading, leagueTable }: LeagueTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <CardTitle>League Table</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="w-full h-12" />
            ))}
          </div>
        ) : leagueTable.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pos</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leagueTable.map((team, index) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.totalPoints}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground">No data available</p>
        )}
      </CardContent>
    </Card>
  );
}