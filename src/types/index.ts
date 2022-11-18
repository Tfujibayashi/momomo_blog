declare const dateNominal: unique symbol;
export type DateType = string & { [dateNominal]: never };

declare const dateTimeNominal: unique symbol;
export type DateTimeType = string & { [dateTimeNominal]: never };

import { Timestamp } from 'firebase/firestore';

export type TimeStamp = Timestamp;
