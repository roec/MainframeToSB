export class DeepSeekClient {
  constructor(private readonly apiKey: string, private readonly model: string, private readonly baseUrl: string) {}
  async chat(system: string, user: string): Promise<string> {
    if (!this.apiKey) return "{}";
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ model: this.model, messages: [{ role: "system", content: system }, { role: "user", content: user }], temperature: 0.1 })
    });
    if (!response.ok) throw new Error(`DeepSeek error: ${response.status} ${await response.text()}`);
    const data: any = await response.json();
    return data.choices?.[0]?.message?.content ?? "{}";
  }
}
