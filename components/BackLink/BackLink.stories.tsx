import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BackLink } from "./BackLink";

const meta: Meta<typeof BackLink> = {
  title: "Atoms/BackLink",
  component: BackLink,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof BackLink>;

export const Subtle: Story = {
  args: {
    variant: "subtle",
    href: "/login",
    children: "Вернуться ко входу",
  },
};

export const Button: Story = {
  args: {
    variant: "button",
    children: "Назад",
  },
};

export const IconVariant: Story = {
  args: { variant: "icon", href: "#", children: "Назад к PIL-15" },
};
