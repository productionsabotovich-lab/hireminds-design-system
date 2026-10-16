import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Topbar } from './Topbar';
import { Brand } from '../Brand';
import { Button } from '../Button';

const meta: Meta<typeof Topbar> = {
  title: 'Atoms/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['app', 'auth'],
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Topbar>;

export const Default: Story = {
  args: {
    variant: 'app',
    left: <Brand name="Hireminds" />,
    right: <Button variant="ghost" size="sm">Account</Button>,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--mute)', padding: '0 16px' }}>app variant (border)</p>
        <Topbar
          variant="app"
          left={<Brand name="Hireminds" />}
          center={<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>Dashboard</span>}
          right={<Button variant="ghost" size="sm">Account</Button>}
        />
      </div>
      <div style={{ background: 'var(--bg-2)', padding: '0' }}>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--mute)', padding: '0 16px' }}>auth variant (no border)</p>
        <Topbar
          variant="auth"
          left={<Brand name="Hireminds" />}
        />
      </div>
    </div>
  ),
};

export const WithThreeSlots: Story = {
  args: {
    variant: 'app',
    left: <Brand name="Hireminds" />,
    center: <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>Workspace / Settings</span>,
    right: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" size="sm">Invite</Button>
        <Button variant="primary" size="sm">Upgrade</Button>
      </div>
    ),
  },
};
