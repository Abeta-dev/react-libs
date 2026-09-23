import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Button } from "./button";

const meta: Meta<typeof Form> = {
  title: "Core UI Primitives/Forms & Inputs/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form management primitives powered by React Hook Form. Provides FormField, FormItem, " +
          "FormLabel, FormControl, FormDescription, and FormMessage with automatic accessibility wiring (aria-describedby, aria-invalid).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

interface VendorProfileFormValues {
  companyName: string;
  contactEmail: string;
  taxId: string;
}

function DefaultFormDemo() {
  const form = useForm<VendorProfileFormValues>({
    defaultValues: {
      companyName: "Acme Corporation",
      contactEmail: "procurement@acme.com",
      taxId: "GSTIN-1029384756",
    },
  });

  const onSubmit = (data: VendorProfileFormValues) => {
    alert(`Form Submitted:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="w-[420px] p-6 border rounded-xl bg-white dark:bg-slate-900 shadow-xs">
      <h3 className="text-base font-bold mb-4 text-slate-900 dark:text-slate-100">
        Supplier Profile Details
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Legal Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter registered business name" {...field} />
                </FormControl>
                <FormDescription>
                  Your entity name as printed on tax identification certificates.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operations Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="vendor-ops@domain.com" {...field} />
                </FormControl>
                <FormDescription>
                  Invoices and purchase notifications will be routed here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-2">
            Save Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultFormDemo />,
};

function ValidationFormDemo() {
  const form = useForm<VendorProfileFormValues>({
    defaultValues: {
      companyName: "",
      contactEmail: "",
      taxId: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: VendorProfileFormValues) => {
    alert(`Form Passed Validation:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="w-[420px] p-6 border rounded-xl bg-white dark:bg-slate-900 shadow-xs">
      <h3 className="text-base font-bold mb-1 text-slate-900 dark:text-slate-100">
        Tax ID Verification
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Try submitting with empty fields to trigger validation errors.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="companyName"
            rules={{
              required: "Company name is required.",
              minLength: { value: 3, message: "Must be at least 3 characters." },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Apex Industries" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            rules={{
              required: "Email address is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Enter a valid email address.",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finance Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="finance@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxId"
            rules={{
              required: "Tax ID / GSTIN is required.",
              minLength: { value: 10, message: "Tax ID must be at least 10 characters." },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax ID (GSTIN / VAT)</FormLabel>
                <FormControl>
                  <Input placeholder="27ABCDE1234F1Z5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-2">
            Submit for Review
          </Button>
        </form>
      </Form>
    </div>
  );
}

export const WithValidationErrors: Story = {
  render: () => <ValidationFormDemo />,
};
