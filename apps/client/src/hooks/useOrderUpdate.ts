import { useMutation } from "@apollo/react-hooks";
import { useCallback } from "react";
import { UPDATE_ORDER_QUERY } from "@client/graphql";

export const useOrderUpdate = () => {
  const [updateOrderMutation] = useMutation(UPDATE_ORDER_QUERY);

  return useCallback(
    async (input) => {
      const mutationResult = await updateOrderMutation({
        variables: { input },
        fetchPolicy: "network-only",
      });
      const { data } = mutationResult;
      const userErrors = data?.userErrors;

      if (userErrors?.length) {
        throw userErrors;
      }

      return mutationResult;
    },
    [updateOrderMutation]
  );
};
