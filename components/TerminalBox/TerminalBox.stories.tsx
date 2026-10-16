import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TerminalBox } from "./TerminalBox";
import s from "./TerminalBox.module.css";

const meta = {
  title: "Atoms/TerminalBox",
  component: TerminalBox,
  tags: ["autodocs"],
  parameters: { layout: "padded", backgrounds: { default: "light" } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 340, width: "100%" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TerminalBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mac: Story = {
  name: "mac — vault.verify",
  args: {
    variant: "mac",
    title: "vault.verify — live",
    children: (
      <>
        <div className={s.line}>
          <span className={s.timestamp}>03:47</span>
          <span className={`${s.ok} ${s.msg}`}>
            key stored <span className={s.dim}>sk-ant-api03-***</span>
          </span>
        </div>
        <div className={s.line}>
          <span className={s.timestamp}>03:47</span>
          <span className={`${s.ok} ${s.msg}`}>
            org resolved <span className={s.acc}>→ acme-corp</span>
          </span>
        </div>
        <div className={s.line}>
          <span className={s.timestamp}>03:47</span>
          <span className={`${s.ok} ${s.msg}`}>
            encrypted <span className={s.dim}>AES-256-GCM</span>
          </span>
        </div>
        <div className={s.line}>
          <span className={s.timestamp} />
          <span className={s.msg}>
            ready<span className={s.pulse} />
          </span>
        </div>
      </>
    ),
  },
};

export const Log: Story = {
  name: "log — tick.log лента",
  args: {
    variant: "log",
    children: (
      <>
        <div className={s.line}>
          <span className={s.timestamp}>— : —</span>
          <span className={s.who}>queue</span>
          <span className={s.muted}>waiting for first hire</span>
        </div>
        <div className={s.line}>
          <span className={s.timestamp}>— : —</span>
          <span className={s.who}>agent.—</span>
          <span className={s.muted}>no agents yet</span>
        </div>
        <div className={s.line}>
          <span className={s.timestamp}>now</span>
          <span className={s.who}>system</span>
          <span className={s.msg}>workspace ready · hello, oleg</span>
        </div>
      </>
    ),
  },
};

export const Config: Story = {
  name: "config — workspace.config",
  args: {
    variant: "config",
    title: "workspace.config",
    children: (
      <>
        <div className={s.kv}>
          <span className={s.kvKey}>name      </span>
          <span className={s.kvVal}>&quot;Acme Corp&quot;</span>
        </div>
        <div className={s.kv}>
          <span className={s.kvKey}>slug      </span>
          <span className={s.kvValAcc}>acme-corp</span>
        </div>
        <div className={s.kv}>
          <span className={s.kvKey}>tz        </span>
          <span className={s.kvVal}>Europe/Moscow</span>
        </div>
        <div className={s.kv}>
          <span className={s.kvKey}>agents    </span>
          <span className={s.kvVal}>6 default</span>
        </div>
        <div className={s.kv}>
          <span className={s.kvKey}>plan      </span>
          <span className={s.kvValAcc}>trial · 14d</span>
        </div>
      </>
    ),
  },
};
