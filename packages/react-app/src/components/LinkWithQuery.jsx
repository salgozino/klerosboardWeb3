import { forwardRef } from "react";
import { Link as LinkRouter, useSearchParams } from "react-router-dom";
import { getChainId } from "../scripts/utils";

export const LinkWithQuery = forwardRef(({ children, to, ...props }, ref) => {
  let [searchParams] = useSearchParams();
  let chainId = getChainId(searchParams)
  return (
    <LinkRouter to={to + '?network=' + chainId} {...props} ref={ref}>
      {children}
    </LinkRouter>
  );
});