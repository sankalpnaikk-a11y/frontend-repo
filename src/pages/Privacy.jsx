export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-slate-200">
      <h1 className="text-3xl font-semibold mb-4 gradient-text">Privacy Policy</h1>

      <p className="text-slate-300 leading-relaxed mb-4">
        Your privacy is important to us. BGErase does not store, sell, or share any
        images uploaded to the website.
      </p>

      <ul className="list-disc ml-6 text-slate-300 text-sm space-y-2 mb-6">
        <li>Images are processed securely and deleted automatically after conversion.</li>
        <li>No personal data is collected without your consent.</li>
        <li>We do not use uploaded files for AI training, analytics, or advertising.</li>
        <li>No login, signup, or tracking pixels are required to use this tool.</li>
      </ul>

      <p className="text-slate-300 leading-relaxed mb-4">
        Third-party analytics (like Google Analytics) may be used to understand website
        performance, but these services never access user-uploaded files.
      </p>

      <p className="text-slate-400 mt-8 text-sm">
        If you have any questions about privacy, you can contact us anytime.
      </p>
    </div>
  );
}
