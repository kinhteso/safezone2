import { format } from "date-fns";
import { vi } from "date-fns/locale";

export const formatDate = (date: string | Date) =>
  format(new Date(date), "dd/MM/yyyy", { locale: vi });

export const clampText = (text: string, max = 140) =>
  text.length > max ? `${text.slice(0, max)}...` : text;
