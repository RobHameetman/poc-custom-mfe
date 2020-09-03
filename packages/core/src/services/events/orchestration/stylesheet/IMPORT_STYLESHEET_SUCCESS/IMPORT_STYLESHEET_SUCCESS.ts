import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportStylesheetSuccessEvent = CustomEvent<string>;

export const importStylesheetSuccess = (
  stylesheet: string,
  service: string,
) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_STYLESHEET_SUCCESS, stylesheet);
};

export const importStylesheetSuccessFrom = (service: string) => (
  stylesheet: string,
) => {
  importStylesheetSuccess(stylesheet, service);
};

export const isImportStylesheetSuccessEvent = (
  value: unknown,
): value is ImportStylesheetSuccessEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportStylesheetSuccessEvent>).type === 'string' &&
    (value as Partial<ImportStylesheetSuccessEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_STYLESHEET_SUCCESS,
    )
  );
};
