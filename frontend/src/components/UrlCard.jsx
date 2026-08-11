import { FiCopy, FiTrash2, FiExternalLink } from "react-icons/fi";

const defaultRedirectHost =
  import.meta.env.VITE_REDIRECT_URL ||
  import.meta.env.VITE_API_URL?.replace("/api", "") ||
  "http://localhost:5000";

const UrlCard = ({ url, onCopy, onDelete }) => {
  const shortUrl = `${defaultRedirectHost}/r/${url.shortCode}`;
  const expired = url.expiresAt && new Date(url.expiresAt) < new Date();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-glow transition hover:-translate-y-0.5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs uppercase tracking-widest text-sky-300">
              Clicks {url.clicks}
            </span>
            {expired ? (
              <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs uppercase tracking-widest text-rose-300">
                Expired
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-widest text-emerald-300">
                Live
              </span>
            )}
          </div>
          <p className="text-slate-300 line-clamp-2">{url.originalUrl}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <span>Short:</span>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sky-300 hover:text-sky-200"
            >
              <FiExternalLink className="h-4 w-4" />
              {shortUrl}
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-400">
              Alias:{" "}
              <span className="text-slate-100">
                {url.alias || "auto-generated"}
              </span>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-400">
              Expires:{" "}
              <span className="text-slate-100">
                {url.expiresAt
                  ? new Date(url.expiresAt).toLocaleDateString()
                  : "never"}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col gap-3 md:items-end">
          {url.qrCode && (
            <img
              src={url.qrCode}
              alt="QR code"
              className="h-24 w-24 rounded-2xl border border-slate-800 bg-slate-950/70 p-1 object-contain"
            />
          )} */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onCopy(shortUrl)}
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 transition hover:bg-sky-400"
          >
            <FiCopy /> Copy
          </button>
          <button
            type="button"
            onClick={() => onDelete(url._id)}
            className="inline-flex items-center gap-2 rounded-2xl bg-rose-500 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 transition hover:bg-rose-400"
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
