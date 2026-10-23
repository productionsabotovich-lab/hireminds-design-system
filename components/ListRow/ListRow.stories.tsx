import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListRow } from "./ListRow";
import { Pill } from "../Pill";
import { UserAvatar } from "../UserAvatar";

const meta: Meta<typeof ListRow> = {
  title: "Data/ListRow",
  component: ListRow,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 340, background: "var(--surface)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ListRow>;

export const DecisionWaiting: Story = {
  args: { href: "#", lead: <UserAvatar name="Антон Саботович" size="xs" shape="circle" />, title: "Лимит кругов", code: "D-44", trailing: <Pill tone="warn" dot>ждёт</Pill>, sub: "Антон Саботович · ждёт 1 д 2 ч" },
};
export const SessionRunning: Story = {
  args: { href: "#", lead: <UserAvatar name="Developer" size="xs" />, title: "Developer", code: "S-118", trailing: <Pill tone="dim" dot pulse>идёт</Pill>, sub: "Code · после возврата · 24 мин" },
};
export const Static: Story = {
  args: { lead: <UserAvatar name="Антон Саботович" size="xs" shape="circle" />, title: "Объём согласован", code: "D-21", trailing: <Pill tone="accent">утверждено</Pill>, sub: "Антон Саботович · кнопка в треде" },
};
