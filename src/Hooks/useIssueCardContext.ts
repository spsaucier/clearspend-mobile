import { IssueCardContext } from '@/Services/Admin/IssueCardProvider';
import { createContextHook } from '@/Services/utils/createContextHook';

export const useIssueCardContext = createContextHook(
  IssueCardContext,
  'IssueCardContext',
  'UseIssueCardContext',
);
