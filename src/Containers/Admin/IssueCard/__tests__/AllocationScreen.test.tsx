import * as React from 'react';
import { fireEvent, within } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import AllocationScreen from '../AllocationScreen';
import { IssueCardProvider } from '@/Services/Admin/IssueCardProvider';
import { adminResponse, fiveLevelsDeepResponse } from '@/Helpers/testing/fixtures/allocations';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

const server = setupServer(
  rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
    res(ctx.json({ allocations: adminResponse })),
  ),
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('AllocationScreen', () => {
  it('renders allocation tree', async () => {
    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider>
        <AllocationScreen />
      </IssueCardProvider>,
    );

    const testId = await findByTestId('issue-card-allocation');
    expect(testId).toBeTruthy();

    const nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeDisabled();
  });

  it('navigates to "Spend Controls" screen after selecting allocation', async () => {
    const allocation = adminResponse.find((a) => a.name === 'Lunch');

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider>
        <AllocationScreen />
      </IssueCardProvider>,
    );

    const option = await findByTestId(`${allocation!.allocationId}-option`);

    fireEvent.press(option);

    const nextButton = await findByTestId('primary-action-button');
    expect(nextButton).toBeEnabled();

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith(IssueCardScreens.SpendControls);
  });

  it('collapsed nodes remain collapsed after parent selection', async () => {
    server.use(
      rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
        res(ctx.json({ allocations: fiveLevelsDeepResponse })),
      ),
    );

    const { allocationId: oneId } =
      fiveLevelsDeepResponse.find((a) => a.allocationId === '1') || {};
    const { allocationId: twoId } =
      fiveLevelsDeepResponse.find((a) => a.allocationId === '1-1') || {};
    const { allocationId: threeId } =
      fiveLevelsDeepResponse.find((a) => a.allocationId === '1-1-1') || {};
    const { allocationId: fourId } =
      fiveLevelsDeepResponse.find((a) => a.allocationId === '1-1-1-1') || {};

    const tree = renderComponentWithQueryClient(
      createQueryClient(),
      <IssueCardProvider>
        <AllocationScreen />
      </IssueCardProvider>,
    );

    const { findByTestId } = tree;

    const one = await findByTestId(oneId!);
    const two = await findByTestId(twoId!);
    const three = await findByTestId(threeId!);
    const four = await findByTestId(fourId!);

    const fourToggle = within(four).queryByTestId(`${fourId}-toggle`);
    const threeToggle = within(three).queryByTestId(`${threeId}-toggle`);
    const twoToggle = within(two).queryByTestId(`${twoId}-toggle`);
    const oneToggle = within(one).queryByTestId(`${oneId}-toggle`);

    const oneOption = within(one).queryByTestId(`${oneId}-option`);

    fireEvent.press(oneOption!);

    fireEvent.press(fourToggle!);
    fireEvent.press(threeToggle!);
    fireEvent.press(twoToggle!);
    fireEvent.press(oneToggle!);

    expect(tree).toMatchSnapshot();

    fireEvent.press(oneOption!);
    fireEvent.press(oneToggle!);

    expect(tree).toMatchSnapshot();
  });
});
