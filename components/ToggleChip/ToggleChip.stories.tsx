import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleChip } from "./ToggleChip";

const meta: Meta<typeof ToggleChip> = {
  title: "Forms/ToggleChip",
  component: ToggleChip,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ToggleChip>;

export const Off: Story = { args: { label: "Подробно", pressed: false, hint: "Показать вызовы инструментов и вывод" } };
export const On: Story = { args: { label: "Подробно", pressed: true } };
