"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { createPolicy } from "@/actions/policies";

/* ─────────────────────────────────────────────
   Create Policy Form — Client Component
   Uses Server Action for form submission.
   ───────────────────────────────────────────── */

export function CreatePolicyForm() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="ng-btn ng-btn-primary">
        <Plus className="w-4 h-4" />
        New Policy
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-ng-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-ng-white border-2 border-ng-black w-full max-w-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-ng-black bg-ng-black text-ng-white">
          <h2 className="text-sm font-black uppercase tracking-widest">
            Create Safety Policy
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1 hover:bg-ng-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form action={createPolicy} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">
              Policy Name
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Block Hate Speech"
              className="ng-input"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Describe what this policy enforces..."
              className="ng-input resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Type
              </label>
              <select name="type" required className="ng-input">
                <option value="CONTENT_FILTER">Content Filter</option>
                <option value="RATE_LIMIT">Rate Limit</option>
                <option value="TOKEN_BUDGET">Token Budget</option>
                <option value="PII_REDACTION">PII Redaction</option>
                <option value="MODEL_ALLOWLIST">Model Allowlist</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Severity
              </label>
              <select name="severity" required className="ng-input">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="enabled"
              id="enabled"
              defaultChecked
              className="w-5 h-5 border-2 border-ng-black accent-ng-black"
            />
            <label
              htmlFor="enabled"
              className="text-sm font-bold uppercase tracking-wider"
            >
              Enabled
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t-2 border-ng-gray-200">
            <button type="submit" className="ng-btn ng-btn-primary flex-1">
              Create Policy
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ng-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
