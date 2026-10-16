import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { H3 } from "./H3";

const meta: Meta<typeof H3> = {
  title: "Atoms/H3",
  component: H3,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof H3>;

export const Card: Story = {
  args: { size: "card", children: "Workspace создан" },
};

export const Inline: Story = {
  args: { size: "inline", children: "Введи email" },
};
