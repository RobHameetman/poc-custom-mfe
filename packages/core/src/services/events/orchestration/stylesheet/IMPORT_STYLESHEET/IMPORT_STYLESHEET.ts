import { ServiceOrchestrationEvents } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ImportStylesheetEvent = CustomEvent<string>;

export const importStylesheet = (stylesheet: string, service: string) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.IMPORT_STYLESHEET, stylesheet);
};

export const importStylesheetFrom = (service: string) => (
  stylesheet: string,
) => {
  importStylesheet(stylesheet, service);
};

export const isImportStylesheetEvent = (
  value: unknown,
): value is ImportStylesheetEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ImportStylesheetEvent>).type === 'string' &&
    (value as Partial<ImportStylesheetEvent>).type!.includes(
      ServiceOrchestrationEvents.IMPORT_STYLESHEET,
    )
  );
};
