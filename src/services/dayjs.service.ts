import dayjsOriginal from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

// In order to use the customParseFormat plugin, we need to extend dayjs with it.
// In order to prevent re-writing 
dayjsOriginal.extend(customParseFormat);

export const dayjs = dayjsOriginal;

export type Dayjs = dayjsOriginal.Dayjs;