import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'app/reducers';

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default function createAsyncAction(
  asyncFunc: Function,
  startedAction: ActionCreator<Action>,
  succeededAction: ActionCreator<Action>,
  failedAction: ActionCreator<Action>
) {
  return  (...args: any[]): AppThunk => async (dispatch: Dispatch) => {
    dispatch(startedAction(...args));
    let result;
    try {
      result = await asyncFunc(...args);
    } catch (error) {
      dispatch(failedAction(error));
      return;
    }
    dispatch(succeededAction(result));
    return result;
  };
}