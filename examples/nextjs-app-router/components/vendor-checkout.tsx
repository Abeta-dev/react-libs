"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@abeta.dev/ui";
import { AmountSummaryCardIndia, UpiQrCard } from "@abeta.dev/india/react";

export interface VendorCheckoutProps {
  vendorName: string;
  gstin: string;
  upiId: string;
  baseAmount: number;
  gstRate: number;
  tdsPercentage: number;
  serverNetPayable: number;
}

export function VendorCheckout({
  vendorName,
  gstin,
  upiId,
  baseAmount,
  gstRate,
  tdsPercentage,
  serverNetPayable,
}: Readonly<VendorCheckoutProps>) {
  const [isIntraState, setIsIntraState] = useState(true);
  const [settled, setSettled] = useState(false);

  async function handleConfirmSettlement() {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSettled(true);
  }

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>{vendorName}</CardTitle>
            <Badge variant={settled ? "default" : "secondary"}>
              {settled ? "Settled" : "Awaiting Payment"}
            </Badge>
          </div>
          <CardDescription>GSTIN: {gstin}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={isIntraState ? "default" : "outline"}
              debounceSec={false}
              onClick={() => setIsIntraState(true)}
            >
              Intra-State (CGST + SGST)
            </Button>
            <Button
              type="button"
              size="sm"
              variant={isIntraState ? "outline" : "default"}
              debounceSec={false}
              onClick={() => setIsIntraState(false)}
            >
              Inter-State (IGST)
            </Button>
          </div>

          <AmountSummaryCardIndia
            baseAmount={baseAmount}
            gstRate={gstRate}
            isIntraState={isIntraState}
            tdsPercentage={tdsPercentage}
            isUrgent={!settled}
            urgentLabel="T+0 Settlement"
          />
        </CardContent>

        <CardFooter className="justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            debounceSec={false}
            onClick={() => setSettled(false)}
          >
            Reset
          </Button>
          <Button
            type="button"
            size="sm"
            loadingText="Recording payout..."
            disabled={settled}
            onClick={handleConfirmSettlement}
          >
            {settled ? "Payout Recorded" : "Mark Payout Complete"}
          </Button>
        </CardFooter>
      </Card>

      <div className="flex items-start justify-center">
        <UpiQrCard
          upiId={upiId}
          payeeName={vendorName}
          amount={Math.round(serverNetPayable)}
          transactionNote={`Settlement ${gstin.slice(0, 10)}`}
          badgeLabel="0% Commission Direct UPI"
        />
      </div>
    </section>
  );
}
