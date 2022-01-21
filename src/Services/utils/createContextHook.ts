import { Context, useContext } from 'react';

/*
Create a useContext hook for a provided context, with error handling
when the hook is used outside the correct Provider.
*/
export const createContextHook =
  <C>(context: Context<C>, contextName: string, hookName: string) =>
  () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
      throw new Error(`${hookName} must be used within a ${contextName} Provider`);
    }
    return ctx as NonNullable<C>;
  };
