import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageHeader } from "./PageHeader";
import { Button } from "../Button";

const meta: Meta<typeof PageHeader> = {
  title: "Navigation/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: "24px 24px 24px 48px", maxWidth: 960, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Task: Story = {
  args: {
    back: { href: "#", label: "К проекту Hireminds pilot" },
    entity: { kind: "task", id: "PIL-15", title: "Роли участников проекта", href: "#", newTab: true, hint: "Открыть в Linear" },
    phase: "Code",
    state: { label: "В работе", tone: "accent", pulse: true },
    meta: ["Developer продолжает после возврата из QA", "обновлено 12 мин назад"],
  },
};
export const Decision: Story = {
  args: {
    back: { href: "#", label: "К задаче PIL-15" },
    entity: { kind: "decision", id: "D-46", title: "Утверждение плана кампании" },
    phase: "Утверждение",
    state: { label: "Ждёт решения", tone: "warn" },
    meta: ["ждёт Антона Саботовича 40 мин", "напоминание сегодня 17:32", "коммит 7c2e0b1"],
    actions: <Button size="sm">Утвердить</Button>,
  },
};
