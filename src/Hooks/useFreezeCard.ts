import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { CARD_QUERY, FREEZE_CARD_MUTATION, UNFREEZE_CARD_MUTATION } from '@/Queries/';

export const useFreezeCard = ({ cardId }: { cardId: string }) => {
  const [internalCardId, setCardId] = useState<String>(cardId);
  const [refetchCard, { loading: refetchingCard }] = useLazyQuery(CARD_QUERY, {
    variables: { cardId },
  });

  const [freeze, { loading: freezing, error: freezeError }] = useMutation(FREEZE_CARD_MUTATION, {
    variables: {
      cardId: internalCardId,
      reasonBody: {
        status: 'BLOCKED',
        statusReason: 'CARDHOLDER_REQUESTED',
      },
    },
    onCompleted() {
      refetchCard();
    },
  });

  const [unfreeze, { loading: unfreezing, error: unfreezeError }] = useMutation(
    UNFREEZE_CARD_MUTATION,
    {
      variables: {
        cardId: internalCardId,
        reasonBody: {
          status: 'OPEN',
          statusReason: 'CARDHOLDER_REQUESTED',
        },
      },
      onCompleted() {
        refetchCard();
      },
    },
  );

  useEffect(() => {
    setCardId(cardId);
  }, [cardId]);

  const loading = refetchingCard || freezing || unfreezing;

  return {
    loading,
    freeze,
    freezeError,
    unfreeze,
    unfreezeError,
  };
};
