import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { fetchUrls, createUrl, deleteUrl } from "../features/url/urlSlice";

import UrlCard from "../components/UrlCard";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { urls, analytics, loading } = useSelector((state) => state.url);

  const [form, setForm] = useState({
    originalUrl: "",
    alias: "",
    expiresAt: "",
  });

  useEffect(() => {
    dispatch(fetchUrls());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createUrl(form)).unwrap();

      toast.success("Short URL Created");

      setForm({
        originalUrl: "",
        alias: "",
        expiresAt: "",
      });

      dispatch(fetchUrls());
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUrl(id)).unwrap();
      toast.success("URL Deleted");
    } catch (error) {
      toast.error(error);
    }
  };

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied");
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold">Welcome {user?.name}</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          name="originalUrl"
          placeholder="Original URL"
          value={form.originalUrl}
          onChange={handleChange}
          className="w-full rounded border p-3 text-black"
        />

        <input
          name="alias"
          placeholder="Alias"
          value={form.alias}
          onChange={handleChange}
          className="w-full rounded border p-3 text-black"
        />

        <input
          type="date"
          name="expiresAt"
          value={form.expiresAt}
          onChange={handleChange}
          className="w-full rounded border p-3 text-black"
        />

        <button className="rounded bg-sky-500 px-5 py-3">Create URL</button>
      </form>

      <h2 className="mb-4 text-2xl">
        Total Clicks : {analytics?.totalClicks || 0}
      </h2>

      <div className="grid gap-5">
        {urls.map((url) => (
          <UrlCard
            key={url._id}
            url={url}
            onCopy={copyText}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
