import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { H2 } from "./H2";

const meta: Meta<typeof H2> = {
  title: "Atoms/H2",
  component: H2,
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
type Story = StoryObj<typeof H2>;

export const Section: Story = {
  args: { size: "section", children: "Профиль workspace" },
};

export const Hero: Story = {
  args: {
    size: "hero",
    children: (
      <>
        Найми первого <em>агента</em>.
      </>
    ),
  },
};
