import { registrationError } from '../REGISTRATION_ERROR';
import { registrationSuccess } from '../REGISTRATION_SUCCESS';
import { RegisterEvent } from '../../events';
import { AppFrameElement } from '../../../services';

export const handleRegister = async (e: RegisterEvent, onRegister: (frame: AppFrameElement) => void): Promise<void> => {
  const { frame, resolve } = e.detail;

  try {

    onRegister(frame);

    await registrationSuccess(frame);
    resolve();
  } catch (error) {
    registrationError(frame, error);
  }

};
