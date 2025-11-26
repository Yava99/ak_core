type Listener<T> = (payload: T) => void;

export class EventBus<TEvents extends Record<string, any>> {
  private listeners = new Map<keyof TEvents, Listener<any>[]>();

  on<K extends keyof TEvents>(event: K, listener: Listener<TEvents[K]>) {
    const list = this.listeners.get(event) ?? [];
    list.push(listener);
    this.listeners.set(event, list);
  }

  off<K extends keyof TEvents>(event: K, listener: Listener<TEvents[K]>) {
    const list = this.listeners.get(event);
    if (!list) return;
    this.listeners.set(
      event,
      list.filter((l) => l !== listener),
    );
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]) {
    const list = this.listeners.get(event);
    if (!list) return;
    for (const listener of list) {
      try {
        listener(payload);
      } catch (e) {
        // on loguera avec logger si besoin
        // eslint-disable-next-line no-console
        console.error('[ak_core] EventBus error', e);
      }
    }
  }
}

// Typage des events core internes (tu complèteras au fur et à mesure)
import type { IPlayerData } from '../../shared';

export interface CoreInternalEvents {
  'core:playerRegistered': { player: IPlayerData };
  'core:playerUpdated': { player: IPlayerData };
  'core:playerUnregistered': { source: number };
}
