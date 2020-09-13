import { RenderingEvents } from '../../enums';
import { Namespaces } from '../../../orchestration';
import { dispatch } from '../../../utils';

export const SET_RENDERER_LISTENING = `${Namespaces.App}:${RenderingEvents.SET_RENDERER_LISTENING}`;
export type SET_RENDERER_LISTENING = typeof SET_RENDERER_LISTENING;

export interface SetRendererListeningEvent
  extends CustomEvent<SetRendererListeningEventDetail> {
  type: SET_RENDERER_LISTENING;
}

export interface SetRendererListeningEventDetail {
  value: boolean;
}

export const setRendererListening = (value: boolean): void => {
  dispatch<SetRendererListeningEventDetail>(SET_RENDERER_LISTENING, {
    value,
  });
};

export const isSetRendererListeningEvent = (
  value: unknown,
): value is SetRendererListeningEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as Partial<SetRendererListeningEvent>).type ===
      SET_RENDERER_LISTENING
  );
};
