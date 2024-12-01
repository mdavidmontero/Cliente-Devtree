import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function ErrorMessage({ children }: Props) {
  return (
    <p className="p-3 text-sm font-bold text-center text-red-600 uppercase bg-red-50">
      {children}
    </p>
  );
}
