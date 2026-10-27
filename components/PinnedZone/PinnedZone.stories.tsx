import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PinnedZone } from "./PinnedZone";
import { DecisionCard } from "../DecisionCard";
import { SessionLive } from "../SessionLive";

const meta: Meta<typeof PinnedZone> = {
  title: "Layout/PinnedZone",
  component: PinnedZone,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof PinnedZone>;

export const DecisionAndSession: Story = {
  args: {
    top: 0,
    children: [
      <DecisionCard key="d" id="D-44" gate="Лимит возвратов исчерпан" line="Ждёт Антона Саботовича 23 ч 45 мин" />,
      <SessionLive key="s" role="Developer" sessionId="S-118" href="#" elapsed="25 мин" plan={{ done: 3, total: 6 }} operation="ждёт решения" />,
    ],
  },
};
