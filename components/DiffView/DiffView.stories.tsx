import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DiffView } from "./DiffView";

const meta: Meta<typeof DiffView> = {
  title: "Data/DiffView",
  component: DiffView,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DiffView>;

export const Short: Story = {
  args: {
    path: "apps/web/src/members/MemberMenu.tsx",
    hunks: [
      {
        oldStart: 14,
        newStart: 14,
        context: "export function MemberMenu({ member, viewer }: MemberMenuProps) {",
        lines: [
          "   const items: MenuItem[] = [];",
          "-  items.push({ id: \"remove\", label: \"Удалить участника\", onSelect: confirmRemove });",
          "+  if (can.removeMember && member.id !== viewer.id) {",
          "+    items.push({ id: \"remove\", label: \"Удалить участника\", onSelect: confirmRemove });",
          "+  }",
          "   return <ActionMenu items={items} />;",
        ],
      },
    ],
  },
};
export const Limited: Story = { args: { ...Short.args, limit: 3 } };
