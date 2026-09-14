import * as React from 'react';

interface AmountSummaryCardIndiaProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Base taxable amount in INR */
    baseAmount?: number;
    /** GST rate percentage (e.g. 5, 12, 18, 28). Default: 18 */
    gstRate?: number;
    /** True if intra-state (CGST 50% + SGST 50%), false for inter-state (IGST 100%). Default: true */
    isIntraState?: boolean;
    /** True if baseAmount already includes GST. Default: false */
    isTaxInclusive?: boolean;
    /** Freight / Cartage / Transportation cost in INR */
    transportCost?: number;
    /** TDS withholding deduction percentage (e.g. 1% or 2% under sec 194C/194J) */
    tdsPercentage?: number;
    /** Explicit override for final net payable */
    netPayable?: number;
    /** Urgent processing indicator flag */
    isUrgent?: boolean;
    /** Label for urgent badge */
    urgentLabel?: string;
    /** Compact or default size */
    size?: "sm" | "default";
}
declare const AmountSummaryCardIndia: React.ForwardRefExoticComponent<AmountSummaryCardIndiaProps & React.RefAttributes<HTMLDivElement>>;

export { AmountSummaryCardIndia, type AmountSummaryCardIndiaProps };
