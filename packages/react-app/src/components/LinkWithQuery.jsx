import { Link as LinkRouter, useSearchParams } from "react-router-dom";
import { getChainId } from "../scripts/utils";

export const LinkWithQuery = ({ children, to, ...props }) => {
    let [searchParams] = useSearchParams();
    let chainId = getChainId(searchParams)
    return (
      <LinkRouter to={to + '?network=' + chainId} {...props}>
        {children}
      </LinkRouter>
    );
  };