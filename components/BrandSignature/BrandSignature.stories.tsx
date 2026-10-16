import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BrandSignature } from "./BrandSignature";

const meta: Meta<typeof BrandSignature> = {
  title: "Atoms/BrandSignature",
  component: BrandSignature,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof BrandSignature>;

export const Default: Story = { args: { version: "S2", year: 2026 } };
export const AuthV2: Story = { args: { segments: ["HM", "auth.v2"] } };
