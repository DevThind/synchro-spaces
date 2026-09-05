export function captureSanitizedError(scope: string, error: unknown, requestId: string) {
  const name = error instanceof Error ? error.message : "UNKNOWN_ERROR";
  // This hook intentionally excludes request bodies and personal information.
  console.error(JSON.stringify({ scope, requestId, error: name.slice(0, 80) }));
}

