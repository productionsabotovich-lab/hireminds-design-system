import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 420 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Empty: Story = { args: { id: "comment", label: "Комментарий", placeholder: "Что нужно учесть роли" } };
export const Required: Story = { args: { id: "reason", label: "Причина возврата", required: true, help: "Задача вернётся в Code; причина попадёт в журнал задачи." } };
export const WithError: Story = { args: { id: "reason-err", label: "Причина возврата", required: true, error: "Укажите причину" } };
export const Counter: Story = { args: { id: "c", label: "Комментарий", maxLength: 500, value: "Проверьте сценарий для viewer." } };
export const Disabled: Story = { args: { id: "d", label: "Комментарий", disabled: true, value: "Решение уже принято" } };
