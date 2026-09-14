import * as React from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { VariantProps } from 'class-variance-authority';

declare const Toast$1: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastProps & React.RefAttributes<HTMLLIElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "destructive" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React.RefAttributes<HTMLLIElement>>;
declare const ToastAction: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast$1>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

type ToasterToast = ToastProps & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
};
type Action = {
    type: "ADD_TOAST";
    toast: ToasterToast;
} | {
    type: "UPDATE_TOAST";
    toast: Partial<ToasterToast>;
} | {
    type: "DISMISS_TOAST";
    toastId?: ToasterToast["id"] | undefined;
} | {
    type: "REMOVE_TOAST";
    toastId?: ToasterToast["id"] | undefined;
};
interface State {
    toasts: ToasterToast[];
}
declare const reducer: (state: State, action: Action) => State;
type Toast = Omit<ToasterToast, "id">;
declare function toast({ ...props }: Toast): {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
};
declare function useToast(): {
    toast: typeof toast;
    dismiss: (toastId?: string) => void;
    toasts: ToasterToast[];
};

export { reducer, toast, useToast };
