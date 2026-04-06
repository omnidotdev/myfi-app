import { createFileRoute } from "@tanstack/react-router";
import { GraphQLClient, gql } from "graphql-request";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  Loader2Icon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { useOrganization } from "@/providers/OrganizationProvider";

export const Route = createFileRoute("/_app/settings/audit")({
  component: AuditLogPage,
});

const CHRONICLE_URL = import.meta.env.VITE_CHRONICLE_GRAPHQL_URL;

const AUDIT_LOG_QUERY = gql`
  query AuditLog(
    $organizationId: ID!
    $action: String
    $since: String
    $until: String
    $limit: Int
    $offset: Int
  ) {
    auditLog(
      organizationId: $organizationId
      product: "myfi"
      action: $action
      since: $since
      until: $until
      limit: $limit
      offset: $offset
    ) {
      id
      action
      actor { id name email }
      resource { type id name }
      metadata
      humanReadable
      relativeTime
      createdAt
    }
  }
`;

const PAGE_SIZE = 50;

const ACTION_OPTIONS = [
  { value: "", label: "All Actions" },
  { value: "journal_entry.created", label: "Journal Entry Created" },
  { value: "journal_entry.deleted", label: "Journal Entry Deleted" },
  { value: "reconciliation.approved", label: "Reconciliation Approved" },
  { value: "reconciliation.corrected", label: "Reconciliation Corrected" },
  { value: "period.closed", label: "Period Closed" },
  { value: "period.reopened", label: "Period Reopened" },
  { value: "rule.created", label: "Rule Created" },
  { value: "rule.deleted", label: "Rule Deleted" },
  { value: "account.created", label: "Account Created" },
  { value: "account.updated", label: "Account Updated" },
  { value: "book.created", label: "Book Created" },
  { value: "book.updated", label: "Book Updated" },
  { value: "connection.created", label: "Connection Created" },
  { value: "connection.deleted", label: "Connection Deleted" },
] as const;

type AuditActor = {
  id: string;
  name: string | null;
  email: string | null;
};

type AuditResource = {
  type: string;
  id: string;
  name: string | null;
};

type AuditEvent = {
  id: string;
  action: string;
  actor: AuditActor | null;
  resource: AuditResource | null;
  metadata: Record<string, unknown> | null;
  humanReadable: string | null;
  relativeTime: string | null;
  createdAt: string;
};

function formatTimestamp(iso: string): string {
  const date = new Date(iso);

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AuditLogPage() {
  const org = useOrganization();
  const organizationId = org?.currentOrganization?.id;

  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filters
  const [actionFilter, setActionFilter] = useState("");
  const [sinceFilter, setSinceFilter] = useState("");
  const [untilFilter, setUntilFilter] = useState("");

  const fetchEvents = useCallback(
    async (currentOffset: number, append: boolean) => {
      if (!organizationId || !CHRONICLE_URL) return;

      setIsLoading(true);

      try {
        const client = new GraphQLClient(CHRONICLE_URL);

        const variables: Record<string, unknown> = {
          organizationId,
          limit: PAGE_SIZE,
          offset: currentOffset,
        };

        if (actionFilter) {
          variables.action = `myfi.${actionFilter}`;
        }

        if (sinceFilter) {
          variables.since = new Date(sinceFilter).toISOString();
        }

        if (untilFilter) {
          variables.until = new Date(untilFilter).toISOString();
        }

        const data = await client.request<{ auditLog: AuditEvent[] }>(
          AUDIT_LOG_QUERY,
          variables,
        );

        const fetched = data.auditLog ?? [];

        setEvents((prev) => (append ? [...prev, ...fetched] : fetched));
        setHasMore(fetched.length === PAGE_SIZE);
      } catch {
        // Silently handle fetch errors
      } finally {
        setIsLoading(false);
      }
    },
    [organizationId, actionFilter, sinceFilter, untilFilter],
  );

  useEffect(() => {
    setOffset(0);
    fetchEvents(0, false);
  }, [fetchEvents]);

  const handleLoadMore = useCallback(() => {
    const nextOffset = offset + PAGE_SIZE;

    setOffset(nextOffset);
    fetchEvents(nextOffset, true);
  }, [offset, fetchEvents]);

  if (!CHRONICLE_URL) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="font-bold text-2xl">Audit Log</h1>
          <p className="text-muted-foreground text-sm">
            Track changes across your organization
          </p>
        </div>

        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <p className="text-muted-foreground text-sm">
            Audit logging requires Chronicle. Configure
            VITE_CHRONICLE_GRAPHQL_URL to enable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="font-bold text-2xl">Audit Log</h1>
        <p className="text-muted-foreground text-sm">
          Track changes across your organization
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label
            className="text-muted-foreground text-xs"
            htmlFor="audit-action"
          >
            Action
          </label>
          <select
            id="audit-action"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {ACTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-muted-foreground text-xs"
            htmlFor="audit-since"
          >
            From
          </label>
          <input
            id="audit-since"
            type="date"
            value={sinceFilter}
            onChange={(e) => setSinceFilter(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-muted-foreground text-xs"
            htmlFor="audit-until"
          >
            To
          </label>
          <input
            id="audit-until"
            type="date"
            value={untilFilter}
            onChange={(e) => setUntilFilter(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Loading state */}
      {isLoading && events.length === 0 && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && events.length === 0 && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <p className="text-muted-foreground text-sm">
            No audit events found
          </p>
        </div>
      )}

      {/* Events table */}
      {events.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b bg-muted/50">
                <th className="w-8 px-3 py-2" />
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                  Timestamp
                </th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                  Actor
                </th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                  Action
                </th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                  Resource
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const isExpanded = expandedId === event.id;
                const actorDisplay =
                  event.actor?.name || event.actor?.email || "System";
                const resourceDisplay = event.resource
                  ? `${event.resource.type}${event.resource.name ? `: ${event.resource.name}` : ""}`
                  : null;

                return (
                  <tr key={event.id} className="border-border border-b last:border-b-0">
                    <td className="px-3 py-2">
                      {event.metadata && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(isExpanded ? null : event.id)
                          }
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {isExpanded ? (
                            <ChevronDownIcon className="size-4" />
                          ) : (
                            <ChevronRightIcon className="size-4" />
                          )}
                        </button>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">
                      {formatTimestamp(event.createdAt)}
                    </td>
                    <td className="px-3 py-2">{actorDisplay}</td>
                    <td className="px-3 py-2">
                      {event.humanReadable || event.action}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {resourceDisplay}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Expanded metadata rows rendered outside table for simplicity */}
          {expandedId && (
            <div className="border-border border-t bg-muted/30 p-4">
              <p className="mb-2 font-medium text-muted-foreground text-xs">
                Metadata
              </p>
              <pre className="overflow-x-auto rounded bg-background p-3 text-xs">
                {JSON.stringify(
                  events.find((e) => e.id === expandedId)?.metadata,
                  null,
                  2,
                )}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {isLoading && <Loader2Icon className="size-4 animate-spin" />}
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
