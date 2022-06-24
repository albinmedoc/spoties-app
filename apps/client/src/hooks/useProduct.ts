import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_PRODUCT_QUERY } from "@client/graphql";
import type { QueryProduct, Product } from '@types';

interface Parameters {
  id: string;
}

const useProduct = ({ id }: Parameters) => {
  const { data, loading } = useQuery<{ product: QueryProduct }>(GET_PRODUCT_QUERY, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  const product: Product = useMemo(() => {
    if (loading || !data) {
      return null;
    }

    return data.product;
  }, [data, loading]);

  return useMemo(() => ({ product, loading }), [product, loading]);
};

export default useProduct;