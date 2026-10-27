import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArtifactView, type Artifact } from "./ArtifactView";

const meta: Meta<typeof ArtifactView> = {
  title: "Data/ArtifactView",
  component: ArtifactView,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ArtifactView>;

export const Doc: Story = {
  args: { artifact: { type: "doc", title: "Объём работ", revision: "ред. 2", path: "docs/specs/PIL-15-roles.md", href: "#", meta: "Аналитик · сегодня, 10:12" } },
};
export const Checks: Story = {
  args: {
    artifact: {
      type: "checks",
      rows: [
        { label: "lint", source: { kind: "github" }, result: "без замечаний" },
        { label: "npm run typecheck", mono: true, state: "fail", source: { kind: "sandbox" }, result: "3 ошибки", out: ["MemberMenu.tsx:42 свойство canRemove не существует"] },
      ],
    },
  },
};
export const Decision: Story = { args: { artifact: { type: "decision", id: "D-44", title: "Лимит возвратов", href: "#", outcome: { label: "Утверждено", tone: "accent" } } } };
// тип не из каталога пришёл из данных: в коде опечатки ловит тип Artifact, на экране — ссылка с подписью
export const Unknown: Story = { args: { artifact: { type: "figma", title: "Макет в Figma", href: "#" } as unknown as Artifact } };
