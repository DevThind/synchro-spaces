type TurnstileResult = { success: boolean; "error-codes"?: string[] };

export interface BotVerifier { verify(token: string, remoteIp?: string): Promise<boolean> }

export class DevelopmentBotVerifier implements BotVerifier { async verify() { return true; } }

export class TurnstileVerifier implements BotVerifier {
  constructor(private readonly secret: string) {}
  async verify(token: string, remoteIp?: string) {
    if (!token) return false;
    const body = new URLSearchParams({ secret: this.secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, cache: "no-store" });
    if (!response.ok) return false;
    return (await response.json() as TurnstileResult).success === true;
  }
}

export function getBotVerifier(): BotVerifier {
  return process.env.TURNSTILE_SECRET_KEY ? new TurnstileVerifier(process.env.TURNSTILE_SECRET_KEY) : new DevelopmentBotVerifier();
}

