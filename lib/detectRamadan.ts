import { HijriDate } from 'hijri-date-converter';

export function isRamadan(): boolean {
  try {
    const hijri = new HijriDate();
    return hijri.month === 9; // Ramadan is the 9th month of the Hijri calendar
  } catch (error) {
    console.error("Could not determine Hijri date:", error);
    return false;
  }
}
