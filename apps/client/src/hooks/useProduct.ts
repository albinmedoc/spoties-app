import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_PRODUCT_QUERY } from "@client/graphql";
import type { QueryProduct, Product, ProductVariant, NodeConnection } from '@types';
import { getNodesFromConnections } from "@client/utilities/graphql";

interface Parameters {
  id: string;
}

const useProduct = ({ id }: Parameters) => {
  const { data, loading } = useQuery<{ product: QueryProduct, productVariants: NodeConnection<ProductVariant> }>(GET_PRODUCT_QUERY, {
    variables: { id, maxProductVariants: 100, productVariantsQuery: `product_id=${id}` },
    fetchPolicy: "network-only",
  });
  
  // eslint-disable-next-line no-console
  console.log(data);

  const product: Product = useMemo(() => {
    if (loading || !data) {
      return null;
    }

    return {
      ...data.product,
      variants: getNodesFromConnections<ProductVariant>(data.productVariants)
    };
  }, [data, loading]);

  return useMemo(() => ({ product, loading }), [product, loading]);
};

export default useProduct;