/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from 'app/store';

export const selectorAllStats = (state: RootState): any => {
  return state.stats?.allStats;
};

export const selectorGpaStats = (state: RootState): any => {
  return state.stats?.gpaStats;
};

export const selectorSchoolStats = (state: RootState): any => {
  return state.stats?.schoolStats;
};

export const selectorSkillStats = (state: RootState): any => {
  return state.stats?.skillStats;
};
