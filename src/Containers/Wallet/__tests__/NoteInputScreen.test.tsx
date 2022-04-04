import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react-native';
import * as navCore from '@react-navigation/core';
import '@testing-library/jest-native/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import NoteInputScreen from '../NoteInputScreen';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { createQueryClient } from '@/Helpers/testing/reactQuery';

const mockedGoBack = jest.fn();

jest.mock('@react-navigation/core', () => {
  const nav = jest.requireActual('@react-navigation/core');
  return {
    ...nav,
    useNavigation: () => ({
      goBack: mockedGoBack,
    }),
    useRoute: jest.fn().mockReturnValue({
      params: {
        notes: '',
        accountActivityId: '1',
      },
    }),
  };
});

describe('Add/Update transactions note Entry', () => {
  const server = setupServer(
    rest.patch('*/users/account-activity/:accountActivityId', (req, res, ctx) => res(ctx.body({}))),
  );

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'error',
    });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    mockedGoBack.mockClear();
  });

  it('Allows change input value', async () => {
    const newNoteInput = 'this is a new note';

    const rendered = renderComponentWithQueryClient(createQueryClient(), <NoteInputScreen />);
    const noteField = await rendered.findByTestId('noteField');

    fireEvent.changeText(noteField, newNoteInput);

    await waitFor(() => expect(noteField.props.value).toBe(newNoteInput));
  });

  it('Renders correctly previously saved note, also disables Set Note button if field has not changed', async () => {
    const previouslySavedNote = 'this is a note';

    jest.spyOn(navCore, 'useRoute').mockImplementationOnce(
      jest.fn().mockReturnValue({
        params: {
          notes: previouslySavedNote,
        },
      }),
    );

    const rendered = renderComponentWithQueryClient(createQueryClient(), <NoteInputScreen />);
    const noteField = await rendered.findByTestId('noteField');

    expect(noteField.props.value).toBe(previouslySavedNote);

    const setNoteButton = await rendered.findByTestId('setNoteButton');

    expect(setNoteButton).toBeDisabled();
  });

  it('Disables Set Note button if field is empty', async () => {
    const rendered = renderComponentWithQueryClient(createQueryClient(), <NoteInputScreen />);
    const noteField = await rendered.findByTestId('noteField');

    expect(noteField.props.value).toBe('');

    const setNoteButton = await rendered.findByTestId('setNoteButton');

    expect(setNoteButton).toBeDisabled();
  });

  it('Set a new note, save it and go back', async () => {
    const previouslySavedNote = 'this is a note';

    jest.spyOn(navCore, 'useRoute').mockImplementationOnce(
      jest.fn().mockReturnValue({
        params: {
          accountActivityId: '1',
          notes: previouslySavedNote,
        },
      }),
    );

    const rendered = renderComponentWithQueryClient(createQueryClient(), <NoteInputScreen />);

    const noteField = await rendered.findByTestId('noteField');
    act(() => {
      fireEvent.changeText(noteField, 'new note');
    });

    const setNoteButton = await rendered.findByTestId('setNoteButton');
    expect(setNoteButton).toBeEnabled();

    act(() => {
      fireEvent.press(setNoteButton);
    });

    await waitFor(() => expect(mockedGoBack).toBeCalled());
  });

  it('Can goback', async () => {
    const rendered = renderComponentWithQueryClient(createQueryClient(), <NoteInputScreen />);

    const cancelButton = await rendered.findByTestId('cancelButton');
    expect(cancelButton).toBeEnabled();

    act(() => {
      fireEvent.press(cancelButton);
    });

    await waitFor(() => expect(mockedGoBack).toBeCalled());
  });
});
