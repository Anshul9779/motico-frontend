import { useQuery } from "react-query";
import { twillioToken } from "../../utils/api";

export const TWILLIO_TOKEN_EXPIRY = 1000 * 60 * 60; // 1hr

const TWO_MINUTES = 1000 * 60 * 2;

export const useTwillioToken = (args?: Args) =>
  useQuery("twillio-token", twillioToken, {
    staleTime: TWILLIO_TOKEN_EXPIRY - TWO_MINUTES,
    ...args,
  });

interface Args {
  onError?: () => void;
  onComplete?: () => void;
}
