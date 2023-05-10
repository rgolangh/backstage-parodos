import React from 'react';
import {
  MockFetchApi,
  renderInTestApp,
  TestApiProvider,
} from '@backstage/test-utils';
import { NotificationList } from './NotificationList';
import { NotificationContent } from '../../models/notification';
import { fetchApiRef } from '@backstage/core-plugin-api';

const notifications: NotificationContent[] = [
  {
    id: '75bc63d7-5a7f-43be-92e9-a1b5a23e7952',
    subject: 'subject',
    createdOn: new Date('2023-05-10T13:40:15.202319Z'),
    messageType: 'test-type',
    body: 'test-body',
    fromuser: 'test',
    read: true,
    tags: [],
    folder: '',
  },
];

describe('<NotifiationList />', () => {
  it('can render a list of notifications', async () => {
    const fetchNotifications = jest.fn();
    const deleteNotification = jest.fn();
    const notificationsLoading = false;
    const setNotificationState = jest.fn();

    const mockFetch = jest.fn().mockName('fetch');
    const m: MockFetchApi = new MockFetchApi({
      baseImplementation: mockFetch,
    });

    const apis = [[fetchApiRef, m.fetch as any]] as const;

    const { getByRole, getByText } = await renderInTestApp(
      <TestApiProvider apis={apis}>
        <NotificationList
          fetchNotifications={fetchNotifications}
          deleteNotification={deleteNotification}
          notifications={notifications}
          notificationsLoading={notificationsLoading}
          setNotificationState={setNotificationState}
          fetch={m.fetch}
        />
      </TestApiProvider>,
    );

    expect(getByRole('checkbox')).toBeInTheDocument();
    expect(getByText('subject')).toBeInTheDocument();
  });
});
