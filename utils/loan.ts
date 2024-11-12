import { StoredLoan } from "@/types";
import moment from "moment";
import { getTokenBalance, roundToSixDecimals } from "./web3";
import { monetaCA, pastDuePenalty, platformCharge } from "./constants";
import { RepaymentBreakdown } from "@/pages/api/getRepaymentBreakdown";

export async function getLoanPendingRepayment(loan: StoredLoan) {
  const { loanActiveAt, duration, ethLent, user } = loan;
  const currentTime = moment();
  const loanActiveTimestamp = moment.unix(loanActiveAt?.seconds || 0);
  const daysSinceLoan = currentTime.diff(loanActiveTimestamp, "days");
  const applyPenalty = daysSinceLoan > duration;

  const isMntaHolder = (await getTokenBalance(user, monetaCA)) > 0;
  let interest = applyPenalty ? daysSinceLoan + pastDuePenalty : daysSinceLoan;
  let interestDiscount = 1;

  if (isMntaHolder) {
    interest /= 2;
    interestDiscount = 0.5;
  }

  // Platform charge
  const repaymentUnder24h = daysSinceLoan === 0;
  const loanPlatformCharge = repaymentUnder24h ? platformCharge : 0;

  const totalToRepay = roundToSixDecimals(
    ethLent * (1 + interest / 100) + loanPlatformCharge
  );

  const breakdown: RepaymentBreakdown = {
    daysSinceLoan,
    interest,
    penalty: applyPenalty,
    totalToRepay,
    repaymentUnder24h: daysSinceLoan === 0,
    isMntaHolder,
    interestDiscount,
  };
  return breakdown;
}
