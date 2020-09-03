import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportStylesheetErrorEvent = CustomEvent<string>;

export const importStylesheetError = (stylesheet: string, service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_STYLESHEET_ERROR, stylesheet);
};

export const importStylesheetErrorFrom = (service: string) => (
  stylesheet: string,
) => {
  importStylesheetError(stylesheet, service);
};

export const isImportStylesheetErrorEvent = (
  value: unknown,
): value is ImportStylesheetErrorEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportStylesheetErrorEvent>).type === 'string' &&
    (value as Partial<ImportStylesheetErrorEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_STYLESHEET_ERROR,
    )
  );
};
