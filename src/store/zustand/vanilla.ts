export interface StoreApi<T> {
  setState: (
    partial: T | Partial<T> | ((state: T) => T | Partial<T>),
    replace?: boolean,
  ) => void;
  getState: () => T;
  subscribe: (listener: (state: T, preState: T) => void) => () => void;
  destroy: () => void;
}

export type StateCreator<T> = (
  setState: StoreApi<T>["setState"],
  getState: StoreApi<T>["getState"],
) => T;

export const createStore = <T>(createState: StateCreator<T>) => {
  type TState = ReturnType<typeof createState>;
  type Listener = (state: TState, preState: TState) => void;

  let state: TState;
  const listeners: Set<Listener> = new Set();

  const getState: StoreApi<TState>["getState"] = () => state;
  const setState: StoreApi<TState>["setState"] = (partial, replace) => {
    const nextState =
      typeof partial === "function" ? (partial as Function)(state) : partial;

    if (!Object.is(nextState, state)) {
      const previousState = state;
      state =
        (replace ?? typeof nextState !== "object")
          ? nextState
          : Object.assign({}, state, nextState);

      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const subscribe: StoreApi<TState>["subscribe"] = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy: StoreApi<TState>["destroy"] = () => {
    listeners.clear();
  };

  const api = {
    getState,
    setState,
    subscribe,
    destroy,
  };

  state = createState(setState, getState, api);

  return api;
};
