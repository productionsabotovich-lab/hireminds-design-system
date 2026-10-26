import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EntityRef } from "./EntityRef";

const meta: Meta<typeof EntityRef> = {
  title: "Data/EntityRef",
  component: EntityRef,
  tags: ["autodocs"],
  argTypes: {
    kind: { control: "select", options: ["task", "session", "decision", "pr", "commit", "ci", "doc"] },
    size: { control: "select", options: ["inline", "title", "heading"] },
  },
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 360, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof EntityRef>;

export const Task: Story = { args: { kind: "task", id: "PIL-15", href: "#" } };
export const SessionTitle: Story = { args: { kind: "session", id: "S-118", title: "Developer", size: "title", href: "#" } };
export const DecisionHeading: Story = { args: { kind: "decision", id: "D-46", title: "Утверждение плана кампании", size: "heading" } };
export const PrExternal: Story = { args: { kind: "pr", id: "#21", href: "#", newTab: true, hint: "Открыть в GitHub" } };
