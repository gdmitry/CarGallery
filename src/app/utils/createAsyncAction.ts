import { Dispatch, ActionCreator, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'app/reducers';

export type AppThunk = ThunkAction<Promise<Object>, RootState, null, Action<string>>;

export function createAsyncAction(
  asyncFunc: Function,
  startedAction: ActionCreator<Action>,
  succeededAction: ActionCreator<Action>,
  failedAction: ActionCreator<Action>
) {
  return (...args: any[]): AppThunk => async (dispatch: Dispatch) => {
    dispatch(startedAction(...args));
    let result;
    let asyncOperation;
    try {
      asyncOperation = asyncFunc(...args);
      result = await asyncOperation;
    } catch (error) {
      dispatch(failedAction(error));
      throw error;
    }
    dispatch(succeededAction(result));
    return asyncOperation;
  };
}
