import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { UpiQrCard } from "../react/index";

describe("UpiQrCard Component (SSR & Static Verification)", () => {
  it("renders empty state placeholder when UPI ID is invalid or empty", () => {
    const html = renderToString(<UpiQrCard upiId="" />);
    expect(html).toContain("Enter a valid UPI VPA");
  });

  it("renders standee with merchant title and UPI VPA", () => {
    const html = renderToString(
      <UpiQrCard
        upiId="academy@okhdfcbank"
        payeeName="Bright Future Academy"
        amount={3500}
      />
    );

    expect(html).toContain("Bright Future Academy");
    expect(html).toContain("₹3,500");
    expect(html).toContain("academy@okhdfcbank");
    expect(html).toContain("NPCI UPI");
    expect(html).toContain("Download Counter Standee");
  });

  it("renders in compact mode without standee frame", () => {
    const html = renderToString(
      <UpiQrCard
        upiId="store@paytm"
        payeeName="Campus Store"
        showStandee={false}
      />
    );

    expect(html).not.toContain("Download Counter Standee");
    expect(html).not.toContain("Merchant VPA");
  });
});
