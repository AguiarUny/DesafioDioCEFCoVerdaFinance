'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getWeeklyTip } from '@/lib/actions';

export function WeeklyTip() {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTip() {
      try {
        setLoading(true);
        setError(null);
        const result = await getWeeklyTip();
        if (result.error) {
          setError(result.error);
        } else if (result.tip) {
          setTip(result.tip);
        }
      } catch (e) {
        setError('Falha ao buscar dica.');
      } finally {
        setLoading(false);
      }
    }
    fetchTip();
  }, []);

  return (
    <Card className="bg-accent/10 border-accent/20">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <div className="p-2 bg-accent rounded-full">
            <Lightbulb className="h-5 w-5 text-accent-foreground" />
        </div>
        <CardTitle className="text-base font-headline">Dica da Semana</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
            <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {tip && <p className="text-sm text-foreground/90">{tip}</p>}
      </CardContent>
    </Card>
  );
}
