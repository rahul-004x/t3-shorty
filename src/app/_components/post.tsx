"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function LatestPost() {
  const utils = api.useUtils();
  const [url, setUrl] = useState("");
  const createUrl = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setUrl("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUrl.mutate({ long: url });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setUrl(e.target.value)}
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
    </div>
  );
}
