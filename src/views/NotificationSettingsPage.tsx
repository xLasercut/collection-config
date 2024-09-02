import {useNavigate} from 'react-router-dom';
import {Button, Checkboxes, Fieldset} from 'nhsuk-react-components';
import {useForm} from 'react-hook-form';
import {NotificationSettings, TNotificationSettings} from '../models/notifications.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {useClientDataStore} from '../store/client-data.ts';
import {FormCheckbox} from '../components/FormCheckbox.tsx';

function NotificationSettingsPage() {
  const navigate = useNavigate();
  const clientDataStore = useClientDataStore();

  const formHandler = useForm<TNotificationSettings>({
    resolver: zodResolver(NotificationSettings),
    values: {
      submissionWindowClose: clientDataStore.notificationSettings.submissionWindowClose,
      submissionWindowOpen: clientDataStore.notificationSettings.submissionWindowOpen,
      submissionProcessed: clientDataStore.notificationSettings.submissionProcessed,
      submissionSummaryReady: clientDataStore.notificationSettings.submissionSummaryReady,
      extractCanBeDownloaded: clientDataStore.notificationSettings.extractCanBeDownloaded,
      midWindowClose: clientDataStore.notificationSettings.midWindowClose,
    },
  });

  const onSubmit = formHandler.handleSubmit(data => {
    clientDataStore.setNotificationSettings(data);
    navigate('/notification-test-two/home');
  });

  return (
    <div className='nhsuk-u-width-full'>
      <h1 className='nhsuk-heading-l' data-test-id='heading-one'>
        SDCS Cloud Notification Management
      </h1>
      <p className='nhsuk-body' data-test-id='welcome-text'>
        Select the notification you want to receive to the email registered to your account. These
        will cover all data collections associated with your account.
      </p>
      <form onSubmit={onSubmit}>
        <Fieldset aria-describedby='notification--hint'>
          <Fieldset.Legend>
            <b>Notify me when:</b>
          </Fieldset.Legend>
          <Checkboxes id='notification' hint='Select all that apply' name='notification'>
            <FormCheckbox formField={'submissionWindowOpen'} formHandler={formHandler}>
              The collection submission window is open
            </FormCheckbox>
            {clientDataStore.isMsds ? (
              <FormCheckbox formField={'midWindowClose'} formHandler={formHandler}>
                The mid-window deadline for provisional submission extracts is closing soon -{' '}
                <b>[applies only to the Maternity Services Data Collection]</b>
              </FormCheckbox>
            ) : null}
            <FormCheckbox formField={'submissionWindowClose'} formHandler={formHandler}>
              The collection submission window is closing soon
            </FormCheckbox>
            <FormCheckbox formField={'submissionProcessed'} formHandler={formHandler}>
              The submission file has been accepted or rejected
            </FormCheckbox>
            <FormCheckbox formField={'submissionSummaryReady'} formHandler={formHandler}>
              The submission summary report is now available for download
            </FormCheckbox>
            <FormCheckbox formField={'extractCanBeDownloaded'} formHandler={formHandler}>
              A requested submission extract is available for download
            </FormCheckbox>
          </Checkboxes>
        </Fieldset>

        <Button type={'submit'}>Save</Button>
      </form>
    </div>
  );
}

export {NotificationSettingsPage};
