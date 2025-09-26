import { format, formatDistanceToNow } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

const timezone = process.env.POSTS_TIMEZONE || 'America/Sao_Paulo';

export function formatDatetime(rawDate: string): string {
  const date = toZonedTime(new Date(rawDate), timezone);
  return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR,
  });
}

export function formatRelativeDate(rawDate: string): string {
  const date = toZonedTime(new Date(rawDate), timezone);
  return formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
}
