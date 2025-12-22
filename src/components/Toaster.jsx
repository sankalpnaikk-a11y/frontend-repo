import { Toaster } from "react-hot-toast";

export default function ToastSystem() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#0f172a",
          color: "white",
          border: "1px solid #334155",
        },
      }}
    />
  );
}
