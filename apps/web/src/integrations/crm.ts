import type { LeadPayload } from "@/lib/lead-schema";

export type AdapterResult = { provider: string; reference: string };
export interface CrmAdapter { submit(lead: LeadPayload, requestId: string): Promise<AdapterResult> }

export class DevelopmentCrmAdapter implements CrmAdapter {
  async submit(_lead: LeadPayload, requestId: string) { return { provider: "development-no-send", reference: requestId }; }
}

export class HubSpotAdapter implements CrmAdapter {
  constructor(private readonly accessToken: string) {}
  async submit(lead: LeadPayload, requestId: string) {
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", { method: "POST", headers: { Authorization: `Bearer ${this.accessToken}`, "Content-Type": "application/json" }, body: JSON.stringify({ properties: { email: lead.email, firstname: lead.name, phone: lead.phone, project_audience: lead.audience, project_type: lead.projectType, project_location: lead.location, services_of_interest: lead.servicesOfInterest.join(";"), project_stage: lead.stage, message: lead.message, website_request_id: requestId } }), cache: "no-store" });
    if (!response.ok) throw new Error("CRM_SUBMISSION_FAILED");
    const result = await response.json() as { id: string };
    return { provider: "hubspot", reference: result.id };
  }
}

export class GoHighLevelAdapter implements CrmAdapter {
  constructor(private readonly apiKey: string, private readonly locationId: string) {}
  async submit(lead: LeadPayload, requestId: string) {
    const response = await fetch("https://services.leadconnectorhq.com/contacts/", { method: "POST", headers: { Authorization: `Bearer ${this.apiKey}`, Version: "2021-07-28", "Content-Type": "application/json" }, body: JSON.stringify({ name: lead.name, email: lead.email, phone: lead.phone, locationId: this.locationId, source: "Website consultation", tags: [lead.audience, lead.projectType], customFields: [{ key: "project_location", field_value: lead.location }, { key: "services", field_value: lead.servicesOfInterest.join(", ") }, { key: "request_id", field_value: requestId }] }), cache: "no-store" });
    if (!response.ok) throw new Error("CRM_SUBMISSION_FAILED");
    const result = await response.json() as { contact?: { id?: string } };
    return { provider: "gohighlevel", reference: result.contact?.id ?? requestId };
  }
}

export function getCrmAdapter(): CrmAdapter {
  if (process.env.CRM_PROVIDER === "hubspot" && process.env.HUBSPOT_ACCESS_TOKEN) return new HubSpotAdapter(process.env.HUBSPOT_ACCESS_TOKEN);
  if (process.env.CRM_PROVIDER === "gohighlevel" && process.env.GOHIGHLEVEL_API_KEY && process.env.GOHIGHLEVEL_LOCATION_ID) return new GoHighLevelAdapter(process.env.GOHIGHLEVEL_API_KEY, process.env.GOHIGHLEVEL_LOCATION_ID);
  return new DevelopmentCrmAdapter();
}

