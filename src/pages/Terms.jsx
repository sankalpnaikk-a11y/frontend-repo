export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-slate-200">
      <h1 className="text-3xl font-semibold mb-4 gradient-text">Terms & Conditions</h1>

      <p className="text-slate-300 leading-relaxed mb-4">
        By using BGErase, you agree to the following terms:
      </p>

      <ul className="list-disc ml-6 text-slate-300 text-sm space-y-2 mb-6">
        <li>You confirm that you own the rights to the images you upload.</li>
        <li>You agree not to upload illegal, abusive, or copyrighted material
          without permission.</li>
        <li>BGErase is not responsible for misuse of processed images.</li>
        <li>The service is provided “as-is” with no guarantee of uptime or accuracy.</li>
      </ul>

      <p className="text-slate-300 leading-relaxed mb-4">
        BGErase reserves the right to update these terms at any time. Continued use
        of the website after updates means you accept the changes.
      </p>

      <p className="text-slate-400 mt-8 text-sm">
        If you disagree with these terms, please stop using the website immediately.
      </p>
    </div>
  );
}
