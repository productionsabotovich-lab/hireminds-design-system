import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PersonRef } from "./PersonRef";

const directory = {
  PM: { agent: { role: "PM", runner: "Claude Code", model: "Sonnet 5.5" }, state: { kind: "free" as const } },
  "Антон Саботович": { human: true, role: "владелец проекта", href: "#" },
};

const meta: Meta<typeof PersonRef> = {
  title: "Data/PersonRef",
  component: PersonRef,
  tags: ["autodocs"],
  decorators: [(Story) => <p style={{ padding: 24, minHeight: 240, background: "var(--bg)" }}>Нужен план кампании — <Story />.</p>],
};

export default meta;
type Story = StoryObj<typeof PersonRef>;

export const Agent: Story = { args: { name: "PM", directory, children: "@PM" } };
export const Human: Story = { args: { name: "Антон Саботович", directory, children: "Антон Саботович", open: true } };
