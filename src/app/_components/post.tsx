"use client";

import { useState } from "react";

import { api } from "@/trpc/react";
import { handler } from "next/dist/build/templates/pages";
import { redirect } from "next/navigation";

export function LatestPost() {
  const utils = api.useUtils();
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const createUrl = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setUrl("");
      setCustom("");
    },
  });

  const handleClick = () => {
    createUrl.mutate({
      long: url,
      ...(custom && { custom }),
    });
  };

  const { data: urls, refetch } = api.post.get.useQuery();

  const increment = api.post.incrementClick.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
  });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // createUrl.mutate({ long: url });
          handleClick();
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="https://..."
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="custom(optional)"
          onChange={(e) => setCustom(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createUrl.isPending}
        >
          {createUrl.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
      {/* refresh / list */}
      <div className="mt-4">
        <button
          onClick={() => refetch()}
          className="mb-4 ml-18 rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        >
          Refresh URLs
        </button>
        <ul className="text-white">
          {urls?.map((u) => (
            <li key={u.short} className="flex items-center gap-2">
              <a
                href={`${u.long}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                <button
                  onClick={() => increment.mutate({ short: u.short })}
                  className="ml-auto rounded bg-white/10 px-2 py-1 text-xs"
                >
                  {u.short}
                </button>
              </a>
              <span>: {u.long}</span>
              <span className="absolute right-23">(clicks: {u.clicks})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
