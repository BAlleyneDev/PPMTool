import {
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
  UPDATE_PROJECT_TASK
} from "../actions/types";

const initialState = {
  project_tasks: [],
  project_task: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        project_tasks: action.payload
      };

    case GET_PROJECT_TASK:
      return {
        ...state,
        project_task: action.payload
      };

    case DELETE_PROJECT_TASK:
      return {
        ...state,
        project_tasks: state.project_tasks.filter(
          project_task => project_task.projectSequence !== action.payload
        )
      };

    case UPDATE_PROJECT_TASK:
      let foundIndex = state.project_tasks.findIndex(
        x => x.projectSequence === action.payload.projectSequence
      );
      state.project_tasks[foundIndex] = action.payload;
      return {
        ...state,
        project_tasks: state.project_tasks
      };

    default:
      return state;
  }
}
