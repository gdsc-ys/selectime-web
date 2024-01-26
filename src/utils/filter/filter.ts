import { TimeSlice } from "./TimeSlice";


export type Filter = (x: TimeSlice) => boolean;

type SuperSortBy = (x: TimeSlice, y: TimeSlice) => number;
export type SortBy = SuperSortBy & ((x: TimeSlice, y: TimeSlice) => 0 | 1);


function merge_filters(filters: Filter[]): Filter {
	return filters.reduce((f0, f1) => (x) => f0(x) && f1(x));
}

function merge_sortBys(sortBys: SortBy[]): SuperSortBy {
  return (sortBys as SuperSortBy[]).reduce((f0, f1) => (x, y) => f0(x, y)*2 + f1(x, y));
}


export function filterTimeSlices(slices: TimeSlice[], filters: Filter[]): TimeSlice[] {
  const filter = merge_filters(filters);
  return slices.filter(filter);
}

export function sortTimeSlices(slices: TimeSlice[], sortBys: SortBy[]): TimeSlice[] {
    const sortBy = merge_sortBys(sortBys);
    return slices.toSorted(sortBy)
}