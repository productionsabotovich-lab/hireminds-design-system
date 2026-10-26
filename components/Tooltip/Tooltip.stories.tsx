import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip } from "./Tooltip";
import { Icon } from "../Icon";

const meta: Meta<typeof Tooltip> = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: "48px 24px", background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const OnIcon: Story = { args: { text: "Приоритет: высокий", children: <Icon name="priority" size={16} /> } };
export const OnLink: Story = {
  args: { text: "Открыть карточку агента", focusable: false, children: <a href="#" aria-label="Открыть карточку агента Developer">↗</a> },
};
