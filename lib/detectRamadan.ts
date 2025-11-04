// Temporarily disabled hijri-date-converter due to build issues
// import { HijriDate } from 'hijri-date-converter';

export function isRamadan(): boolean {
  // Disabled for now - will re-enable after fixing hijri-date-converter
  return false;
  
  // try {
  //   const hijri = new HijriDate();
  //   return hijri.month === 9; // Ramadan is the 9th month of the Hijri calendar
  // } catch (error) {
  //   console.error("Could not determine Hijri date:", error);
  //   return false;
  // }
}
