import { createReducer } from '@reduxjs/toolkit';
import { actionGetStatsAll, actionGetStatsGpa, actionGetStatsSchool, actionGetStatsSkill } from './actions';
import { StatsState } from './type';

const initState: StatsState = {
  allStats: {},
  gpaStats: {},
  schoolStats: {},
  skillStats: {},
};

const statsReducer = createReducer(initState, (builder) => {
  builder.addCase(actionGetStatsAll.fulfilled, (state, action) => {    
    state.allStats = action.payload;
  });
  builder.addCase(actionGetStatsGpa.fulfilled, (state, action) => {    
    state.gpaStats = action.payload;
  });
  builder.addCase(actionGetStatsSchool.fulfilled, (state, action) => {    
    state.schoolStats = action.payload;
  });
  builder.addCase(actionGetStatsSkill.fulfilled, (state, action) => {    
    state.skillStats = action.payload;
  });
});

export default statsReducer;
