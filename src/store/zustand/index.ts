import { useSyncExternalStore } from "react";
import { createStore, type StateCreator, StoreApi } from "./vanilla";

type ExtractState<S> = S extends { getState: () => infer F } ? F : never;

type readonlyStoreApi<T> = Pick<StoreApi<T>, "getState" | "subscribe">;

type withReact<S extends readonlyStoreApi<unknown>> = S & {
  getServerState?: () => ExtractState<S>;
};

export const create = <T>(createState: StateCreator<T>) =>
  createStateImpl(createState);

const createStateImpl = <T>(createState: StateCreator<T>) => {
  const api = createStore(createState);

  const useBoundStore = () => useStore(api);

  return useBoundStore;
};

const useStore = <TState>(api: withReact<StoreApi<TState>>) => {
  const slice = useSyncExternalStore(api.subscribe, api.getState);

  return slice;
};
