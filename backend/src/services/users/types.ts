export const possibleIDTypes = ["student", "teacher", "staff"] as const;
export type IDType = typeof possibleIDTypes[number];
