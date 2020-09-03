import { ServiceOrchestrationEvents, ServiceStatuses } from '../../../../enums';
import { dispatchFrom } from '../../../../../utils';

export type ChangeStatusEvent = CustomEvent<ServiceStatuses>;

export const changeStatus = (service: string, status: ServiceStatuses) => {
  const dispatch = dispatchFrom(service);

  dispatch(ServiceOrchestrationEvents.CHANGE_STATUS, status);
};

export const changeStatusFrom = (service: string) => (
  status: ServiceStatuses,
) => {
  changeStatus(service, status);
};

export const isChangeStatusEvent = (
  value: unknown,
): value is ChangeStatusEvent => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof (value as Partial<ChangeStatusEvent>).type === 'string' &&
    (value as Partial<ChangeStatusEvent>).type!.includes(
      ServiceOrchestrationEvents.CHANGE_STATUS,
    )
  );
};
