import { useMutation } from "@apollo/react-hooks";
import { useCallback } from "react";
import { UPDATE_PRODUCT_QUERY } from "@client/graphql";
import type { QueryProduct } from "@types";

const useProductUpdate = () => {
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT_QUERY);

  return useCallback(
    async (input: Partial<QueryProduct>) => {
      const mutationResult = await updateProductMutation({
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
    [updateProductMutation]
  );
};

export default useProductUpdate;
